import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	username: string = undefined;
	subscription: Subscription;

  constructor(
		private dialog: MatDialog,
		@Inject('BaseURL') public BaseURL,
		private authService: AuthService
	) { }

  ngOnInit() {
		this.authService.loadUserCredentials();
		this.subscription = this.authService.getUsername()
	 	.subscribe(username => { this.username = username; console.log("username :", this.username); })
  }
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	openLoginForm() {
    this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
  }
	
	logOut() {
		this.username = undefined;
		this.authService.logOut();
	}

}
