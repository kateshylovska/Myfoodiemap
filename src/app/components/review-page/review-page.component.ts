import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RestaurantService} from '../../service/restaurant.service';
import {Restaurant} from '../../model/restaurant';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {Review} from '../../model/review';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css']
})
export class ReviewPageComponent implements OnInit {
  private data: Restaurant;
  lat = 47.61022;
  lng = -122.347613;
  form: FormGroup;
  private review: any = {};
  private restaurantId: string;
  public averageRating: number;
  public restaurant: any;

  displayedColumns: string[] = ['id', 'user', 'review', 'rating'];
  dataSource = [];

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.restaurantId = id;
    if (id) {
      this.form = this.formBuilder.group({
        review: ['', Validators.required],
        rating: ['', Validators.required],
      });
      // making request to backend and database and get restaurant by id
      this.restaurantService.get(id).subscribe(restaurant => {
        if (restaurant) {
          this.data = restaurant;
          this.getReviews();
        }
      });
    }
  }

  onRate($event: { oldValue: number, newValue: number, starRating: any }) {
  }
  getReviews(): void {
    this.restaurantService.getReviews(this.data.id, 10).subscribe(reviews => {
      if (reviews && reviews.result.length) {
        this.dataSource = reviews.result;
        let rating = 0;
        this.dataSource.forEach(item => {
            rating += +item.rating;
        });
        this.averageRating = rating / this.dataSource.length;
        this.restaurantService.get(this.dataSource[0].restaurant_id).subscribe(restaurant => {
          if (restaurant) {
            this.restaurant = {...restaurant, rating: this.averageRating};
            this.restaurantService.save(this.restaurant).subscribe();
          }
        });
      }
    });
  }

  save() {
    this.review.review_body = this.form.get('review').value;
    this.review.rating = this.form.get('rating').value;
    this.review.restaurant_id = this.restaurantId;

    this.restaurantService.saveReview(this.review).subscribe(e => {
      this.getReviews();
    });
  }
}
