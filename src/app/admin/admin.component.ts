import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { User } from '../shared/user';
import { baseURL } from '../shared/baseurl';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'app-admin',
  styleUrls: ['./admin.component.scss'],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  displayedColumns = ['id', 'username', 'firstname', 'lastname', 'admin'];
  database: Database | null;
  data: User[] = [];

	resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.database = new Database(this.http);

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.database!.getUsers(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => this.data = data);
  }
}

export interface UserApi {
  users: User[];
  total_count: number;
}

/** An example database that the data source uses to retrieve data for the table. */
export class Database {
  constructor(private http: HttpClient) {}
	
	getUsers(sort: string, order: string, page: number): Observable<User[]> {
		return this.http.get<User[]>(baseURL + 'users');
	}
}
