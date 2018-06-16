import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf, Observable, throwError } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
		private http: HttpClient,
		private processHTTPMsgService: ProcessHTTPMsgService
	) { }
	
	getFeedbacks(): Observable<any> {
		return this.http.get(baseURL + 'feedbacks')
						.pipe(
							catchError(e => { return this.processHTTPMsgService.handleError(e);})	
						);
	}
	
	postFeedback(feedback: any): Observable<any> {
		return this.http.post(baseURL + 'feedbacks', feedback)
						.pipe(
							catchError(e => { return this.processHTTPMsgService.handleError(e);})	
						);
	}
}


