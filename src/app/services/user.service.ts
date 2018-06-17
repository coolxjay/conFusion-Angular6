import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { baseURL } from '../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
		private http: HttpClient
	) { }
	
	getUsers(): Observable<User[]> {
		return this.http.get<User[]>(baseURL + 'users')
	}

}
