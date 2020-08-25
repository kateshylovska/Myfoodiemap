import {Injectable} from '@angular/core';
import {Restaurant} from '../model/restaurant';
import {Observable} from 'rxjs';
import {GenericCrudService} from './generic-crud.service';
import {PagedResult} from '../model/paged-result';
import {HttpClient} from '@angular/common/http';
import {Review} from '../model/review';
import {map} from 'rxjs/operators';

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

  saveReview(data: Review): Observable<Review> {
    console.log('saveReview', data);
    return this.crudService.save(data, 'review');
  }

  search(params: Map<string, string>): Observable<PagedResult<Restaurant>> {
    return this.crudService.get(params, 'restaurants');
  }

  getReviews(restaurantId, pageSize): Observable<PagedResult<Review>> {
    const params = new Map<string, string>();
    params.set('restaurant_id', restaurantId);
    params.set('pageSize', pageSize);
    return this.crudService.get<any>(params, 'reviews').pipe(
      map(result => {
        result.result.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        return result;
      })
    );
  }

  get(id: string): Observable<Restaurant> {
    const params = new Map<string, string>();
    params.set('id', id);

    return this.crudService.get(params, 'restaurant');
  }

}
