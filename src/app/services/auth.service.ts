import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf, Observable, throwError, Subject } from 'rxjs';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
import * as jwt_decode from 'jwt-decode';

interface AuthResponse {
  status: string,
  success: string,
  token: string
};

interface JWTResponse {
  status: string,
  success: string,
  user: any
};

interface UserInfo {
	username: string,
	admin: boolean
}

@Injectable()
export class AuthService {

 tokenKey: string = 'JWT';
 isAuthenticated: Boolean = false;
 userInfo: Subject<UserInfo> = new Subject<UserInfo>();
 authToken: string = undefined;

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { 
  }
  
  checkJWTtoken() {
    this.http.get<JWTResponse>(baseURL + 'users/checkJWTToken')
    .subscribe(res => {
      console.log("JWT Token Valid: ", res);
      this.sendUserInfo({username: res.user.username, admin: res.user.admin});
    },
    err => {
      console.log("JWT Token invalid: ", err);
      this.destroyUserCredentials();
    })
  }
 
  sendUserInfo(userInfo: UserInfo) {
    this.userInfo.next(userInfo);
  }

  clearUserInfo() {
		this.userInfo.next({username: undefined, admin: false});
  }

  loadUserCredentials() {
    var credentials = JSON.parse(localStorage.getItem(this.tokenKey));
    console.log("loadUserCredentials ", credentials);
    if (credentials && credentials.username != undefined) {
      this.useCredentials(credentials);
      if (this.authToken)
        this.checkJWTtoken();
    }
  }

  storeUserCredentials(credentials: any) {
    console.log("storeUserCredentials ", credentials);    
    localStorage.setItem(this.tokenKey, JSON.stringify(credentials));
    this.useCredentials(credentials);
  }

  useCredentials(credentials: any) {
    this.isAuthenticated = true;		
    this.sendUserInfo({ username: credentials.username, admin: jwt_decode(credentials.token).admin });
    this.authToken = credentials.token;
  }

  destroyUserCredentials() {
    this.authToken = undefined;
    this.clearUserInfo();
    this.isAuthenticated = false;
    localStorage.removeItem(this.tokenKey);
  }

  signUp() {

  }

  logIn(user: any): Observable<any> {
    return this.http.post<AuthResponse>(baseURL + 'users/login', 
      {"username": user.username, "password": user.password})
			.pipe(
				map(res => {
					this.storeUserCredentials({username: user.username, token: res.token});
          return {'success': true, 'username': user.username };
				}),
				catchError(e => { return this.processHTTPMsgService.handleError(e);})
			);
  }

  logOut() {
    this.destroyUserCredentials();
  }

  isLoggedIn(): Boolean {
    return this.isAuthenticated;
  }

  getUserInfo(): Observable<UserInfo> {
    return this.userInfo.asObservable();
  }

  getToken(): string {
    return this.authToken;
  }
	
}
