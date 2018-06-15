import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(
		private http: HttpClient
	) { }
	
	getDishes(): Observable<any> {
		return this.http.get(baseURL + 'dishes')
						.pipe(
							catchError(e => throwError(e))	
						);
	}
	
	getDish(id: number): Observable<any> {
		return this.http.get(baseURL + 'dishes/' + id)
				   .pipe(
					 	catchError(e => throwError(e))
					 );
	}
	
	getFeaturedDish(): Observable<any> {
		return this.http.get(baseURL + 'dishes?featured=true')
		 		   .pipe(
					 	map(dishes => dishes[0]),
					 	catchError(e => throwError(e))
					 );
	}
}
