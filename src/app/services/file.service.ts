import { Injectable } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf, Observable, throwError } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
		private http: HttpClient,
		private processHTTPMsgService: ProcessHTTPMsgService
	) { }
	
	postFile(formData: FormData): Observable<any> {
		return this.http.post(baseURL + 'imageUpload', formData)
		.pipe(
					 	catchError(e => { return this.processHTTPMsgService.handleError(e);})
					 );
	}
}