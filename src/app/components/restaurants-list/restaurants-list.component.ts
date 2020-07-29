import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {PeriodicElement} from '../../app.component';
import {RestaurantService} from '../../service/restaurant.service';
import {Restaurant} from '../../model/restaurant';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.css']
})
export class RestaurantsListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'street', 'city', 'state_code', 'phone', 'website'];
  dataSource = new MatTableDataSource<Restaurant>();
  lat = 47.61022;
  lng = -122.347613;

  constructor(
    private restaurantService: RestaurantService
  ) {
  }

  ngOnInit(): void {
    const params = new Map<string, string>();

    this.restaurantService.search(params).subscribe(e => {
      this.dataSource.data = e.result;
    });
  }
}