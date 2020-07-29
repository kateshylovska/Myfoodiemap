import {Injectable} from '@angular/core';
import {Restaurant} from '../model/restaurant';
import {Observable} from 'rxjs';
import {GenericCrudService} from './generic-crud.service';
import {PagedResult} from '../model/paged-result';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(
    private crudService: GenericCrudService
  ) {
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
