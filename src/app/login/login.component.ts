import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  user = {username: '', password: '', remember: false};
	hide: boolean = true;
	
  constructor(
		public dialogRef: MatDialogRef<LoginComponent>,
		private authService: AuthService
		) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log("User: ", this.user);
		this.authService.logIn(this.user)
		.subscribe(res => {
			if(res.success) {
				this.dialogRef.close();
			}
			else {
				this.user.username = '';
				this.user.password = '';
				this.user.remember = false;
				this.hide = true;
			}
		}, (err) => {
			this.user.username = '';
			this.user.password = '';
			this.user.remember = false;
			this.hide = true;
		});
  }

}

	