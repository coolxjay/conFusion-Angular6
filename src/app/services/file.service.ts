import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf, Observable, throwError } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Video } from '../shared/video';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
		private http: HttpClient,
		private processHTTPMsgService: ProcessHTTPMsgService
	) { }
	
	postImageFile(formData: FormData): Observable<any> {
		return this.http.post(baseURL + 'images', formData)
		.pipe(
			catchError(e => { return this.processHTTPMsgService.handleError(e);})
		);
	}
	
	getVideoInfo(): Observable<any> {
		return this.http.get(baseURL + 'videoInfo')
		.pipe(
			catchError(e => { return this.processHTTPMsgService.handleError(e);})
		);
	}
	
	postVideoInfo(video: any): Observable<any> {
		return this.http.post(baseURL + 'videoInfo', video)
		.pipe(
			catchError(e => { return this.processHTTPMsgService.handleError(e);})
		);
	}
	
	postVideoFile(formData: FormData): Observable<any> {
		return this.http.post(baseURL + 'videos', formData)
		.pipe(
			catchError(e => { return this.processHTTPMsgService.handleError(e);})
		);
	}
}