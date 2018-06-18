import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-admin',
  styleUrls: ['./admin.component.scss'],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  displayedColumns = ['id', 'username', 'firstname', 'lastname', 'admin'];
  dataSource: any;

  constructor(
		private userService: UserService	
	) {}
	
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	
	applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
		this.userService.getUsers()
		.subscribe(data => { 
			this.dataSource = new MatTableDataSource(data);		
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
		
  }
}

