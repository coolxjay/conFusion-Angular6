import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf, Observable, throwError } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(
		private http: HttpClient,
		private processHTTPMsgService: ProcessHTTPMsgService
	) { }
	
	getDishes(): Observable<any> {
		return this.http.get(baseURL + 'dishes')
						.pipe(
							catchError(e => { return this.processHTTPMsgService.handleError(e);})	
						);
	}
	
	getDish(id: number): Observable<any> {
		return this.http.get(baseURL + 'dishes/' + id)
				   .pipe(
					 	catchError(e => { return this.processHTTPMsgService.handleError(e);})
					 );
	}
	
	getFeaturedDish(): Observable<any> {
		return this.http.get(baseURL + 'dishes?featured=true')
		 		   .pipe(
					 	map(dishes => dishes[0]),
					 	catchError(e => { return this.processHTTPMsgService.handleError(e);})
					 );
	}
	
	postComment(dishId: string, comment: any) {
		return this.http.post(baseURL + 'dishes/' + dishId + '/comments', comment)
						.pipe(
					 	map(dishes => dishes[0]),
					 	catchError(e => { return this.processHTTPMsgService.handleError(e);})
					 );
	}
}
