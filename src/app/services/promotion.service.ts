import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
		private http: HttpClient
	) { }
	
	getFeaturedPromotion(): Observable<any> {
		return this.http.get(baseURL + 'promotions?featured=true')
			     .pipe(
					 	map(promotions => promotions[0]),
					 	catchError(e => throwError(e))
					 );
	}
}
