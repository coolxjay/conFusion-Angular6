import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }
	
	getLeaders(): Observable<Leader[]> {
		return ObservableOf(LEADERS)
					 .pipe(
					 	catchError(e => throwError(e))
					 );
	}
	
	getFeaturedLeader(): Observable<Leader> {
		return ObservableOf(LEADERS.filter((leaders) => leaders.featured)[0])
				   .pipe(
					 	map(leaders => leaders[0]),
					 	catchError(e => throwError(e))
					 );
	}
}
