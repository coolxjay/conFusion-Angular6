import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { map, catchError } from 'rxjs/operators';
import { of as ObservableOf, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
	
	getFeaturedPromotion(): Observable<Promotion> {
		return ObservableOf(PROMOTIONS.filter((promotion) => promotion.featured)[0])
			     .pipe(
					 	map(promotions => promotions[0]),
					 	catchError(e => throwError(e))
					 );
	}
}
