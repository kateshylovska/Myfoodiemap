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
export class RestaurantDetailsComponent implements OnInit {

  form: FormGroup;
  data: Restaurant;

  constructor(
    public location: Location,
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      street1: ['', Validators.required],
      city: ['', Validators.required],
      state_code: ['', Validators.required],
      country: ['', Validators.required],
      zip: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      website: ['', Validators.required],
      phone: ['', Validators.required],
    });

    if (id) {
      this.restaurantService.get(id).subscribe(e => {
        if (e) {
          this.form.get('name').setValue(e.name);
          this.form.get('street1').setValue(e.street1);
          this.form.get('city').setValue(e.city);
          this.form.get('state_code').setValue(e.state_code);
          this.form.get('country').setValue(e.country);
          this.form.get('zip').setValue(e.zip);
          this.form.get('website').setValue(e.website);
          this.form.get('phone').setValue(e.phone);
          this.data = e;
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
    this.data.country = this.form.get('country').value;
    this.data.zip = this.form.get('zip').value;
    this.data.website = this.form.get('website').value;
    this.data.phone = this.form.get('phone').value;

    this.restaurantService.save(this.data).subscribe(e => {
      this.location.back();
    });
  }

}
