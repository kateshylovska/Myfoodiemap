import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericCrudService {

  private invokeUrl = 'https://erpcspxkn2.execute-api.us-east-2.amazonaws.com/dev';

  constructor(private http: HttpClient,
  ) {
  }

  get<T>(entries: Map<string, string>, api: string): Observable<T> {
    let params = new HttpParams();
    entries.forEach((value: string, key: string) => {
      params = params.append(key, value);
    });

    const url = `${this.invokeUrl}/${api}`;
    console.log(url);

    return this.http.get<T>(url, this.getOptions(params));
  }

  save<T>(t: T, api: string): Observable<T> {
    const url = `${this.invokeUrl}/${api}`;
    return this.http.post<T>(url, t, this.getOptions(null));
  }

  delete<T>(entries: Map<string, string>, api: string): Observable<T> {
    let params = new HttpParams();
    entries.forEach((value: string, key: string) => {
      params = params.append(key, value);
    });

    const url = `${this.invokeUrl}/${api}`;

    return this.http.delete<T>(url, this.getOptions(params));
  }

  private getOptions(params) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params
    };
  }
}
