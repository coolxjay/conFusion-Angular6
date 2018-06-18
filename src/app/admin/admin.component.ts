import {Component, OnInit} from '@angular/core';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-admin',
  styleUrls: ['./admin.component.scss'],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  displayedColumns = ['id', 'username', 'firstname', 'lastname', 'admin'];
  dataSource: User[] = [];

  constructor(
		private userService: UserService	
	) {}

  ngOnInit() {
		this.userService.getUsers()
		.subscribe(data => this.dataSource = data);
  }
}

