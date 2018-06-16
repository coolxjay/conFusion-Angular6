import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf, Observable, throwError } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(
		private http: HttpClient,
		private processHTTPMsgService: ProcessHTTPMsgService
	) { }
	
	getLeaders(): Observable<any> {
		return this.http.get(baseURL + 'leaders')
					 .pipe(
					 	catchError(e => { return this.processHTTPMsgService.handleError(e);} )
					 );
	}
	getFeaturedLeader(): Observable<any> {
		return this.http.get(baseURL + 'leaders?featured=true')
				   .pipe(
					 	map(leaders => leaders[0]),
					 	catchError(e => { return this.processHTTPMsgService.handleError(e);} )
					 );
	}
	
}
