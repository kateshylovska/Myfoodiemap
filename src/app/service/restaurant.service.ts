import {Injectable} from '@angular/core';
import {Restaurant} from '../model/restaurant';
import {Observable} from 'rxjs';
import {GenericCrudService} from './generic-crud.service';
import {PagedResult} from '../model/paged-result';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private crudService: GenericCrudService,
    private http: HttpClient,
  ) {
  }

  getGeoById(address: string): Observable<any> {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBFhoeUwsizsKcA6IXO0DL3NuO-6zEqibg`);
  }

  save(data: Restaurant): Observable<Restaurant> {
    return this.crudService.save(data, 'restaurant');
  }

  search(params: Map<string, string>): Observable<PagedResult<Restaurant>> {
    return this.crudService.get(params, 'restaurants');
  }

  get(id: string): Observable<Restaurant> {
    const params = new Map<string, string>();
    params.set('id', id);

    return this.crudService.get(params, 'restaurant');
  }

}
