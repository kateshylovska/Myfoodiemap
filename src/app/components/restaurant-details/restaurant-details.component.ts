import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {RestaurantService} from '../../service/restaurant.service';
import {Restaurant} from '../../model/restaurant';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})

// This class uses twice. First time - when user want to add new restaurant. Second time - when user want to edit existing restaurant
export class RestaurantDetailsComponent implements OnInit {

  form: FormGroup;
  data: Restaurant;
  categories: any[] = [
    {
      value: 'All'
    },
    {
      value: 'Asian'
    },
    {
      value: 'American'
    },
    {
      value: 'Bakery'
    },
    {
      value: 'Indian'
    },
    {
      value: 'Vegan'
    },
    {
      value: 'Mediterranean'
    },
    {
      value: 'Italian'
    }
  ];

  constructor(
    public location: Location,
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      street1: ['', Validators.required],
      city: ['', Validators.required],
      state_code: ['', Validators.required],
      zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      website: ['', Validators.required],
      phone: ['', Validators.required],
      category: ['', Validators.required],
      geo_lat: ['', Validators.required],
      geo_lng: ['', Validators.required]
    });
    // if exist id in url then we set existing values to our Reactive Form that comes from Database
    if (id) {
      // making request to backend and database and get restaurant by id
      this.restaurantService.get(id).subscribe(restaurant => {
        if (restaurant) {
          this.form.get('name').setValue(restaurant.name);
          this.form.get('street1').setValue(restaurant.street1);
          this.form.get('city').setValue(restaurant.city);
          this.form.get('state_code').setValue(restaurant.state_code);
          this.form.get('zip').setValue(restaurant.zip);
          this.form.get('website').setValue(restaurant.website);
          this.form.get('phone').setValue(restaurant.phone);
          this.form.get('category').setValue(restaurant.category);
          if (restaurant.geo) {
            this.form.get('geo_lat').setValue(restaurant.geo.lat);
            this.form.get('geo_lng').setValue(restaurant.geo.lng);
          }
          this.data = restaurant;
        }
      });
    }
  }

  save() {
    if (!this.data) {
      this.data = new Restaurant();
    }

    this.data.name = this.form.get('name').value;
    this.data.street1 = this.form.get('street1').value;
    this.data.city = this.form.get('city').value;
    this.data.state_code = this.form.get('state_code').value;
    this.data.zip = this.form.get('zip').value;
    this.data.website = this.form.get('website').value;
    this.data.phone = this.form.get('phone').value;
    this.data.category = this.form.get('category').value;
    if (this.data.geo) {
      this.data.geo.lat = this.form.get('geo_lat').value;
      this.data.geo.lng = this.form.get('geo_lng').value;
    } else {
      this.data.geo = {
        lat: this.form.get('geo_lat').value,
        lng: this.form.get('geo_lng').value
      };
    }

    this.restaurantService.save(this.data).subscribe(e => {
      this.location.back();
    });
  }

  getGeoByAddress() {
    if (this.form.get('street1').value === '' || !this.form.get('street1').value) {
      alert('Fill the street field');
      return;
    }
    this.restaurantService.getGeoById(this.form.get('street1').value).subscribe(result => {
      const location = result.results[0].geometry.location;
      this.form.get('geo_lat').setValue(location.lat);
      this.form.get('geo_lng').setValue(location.lng);
    });
  }
}
