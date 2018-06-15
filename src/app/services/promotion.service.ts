import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
	
	getFeaturedPromotion(): Promotion {
		return PROMOTIONS.filter((promotion) => promotion.featured)[0];
	}
}
