import { Injectable } from '@angular/core';
import { Favorite } from '../shared/favorite';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf, Observable, throwError } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(
		private http: HttpClient,
		private processHTTPMsgService: ProcessHTTPMsgService
	) { }
	
	getFavorites(): Observable<any> {
		return this.http.get(baseURL + 'favorites')
						.pipe(
							catchError(e => { return this.processHTTPMsgService.handleError(e);})	
						);
	}
	
	postFavorite(id: string): Observable<any> {
		return this.http.post(baseURL + 'favorites/' + id)
						.pipe(
							catchError(e => { return this.processHTTPMsgService.handleError(e);})	
						);
	}
	
	deleteFavorite(id: string): Observable<any> {
		return this.http.delete(baseURL + 'favorites/' + id)
						.pipe(
							catchError(e => { return this.processHTTPMsgService.handleError(e);})	
						);
	}
	
}

	