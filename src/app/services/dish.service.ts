import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }
	
	getDishes(): Dish[] {
		return DISHES;
	}
	
	getDish(id: number): Dish {
		return DISHES.filter((dishes) => (dishes.id === id))[0];
	}
	
	getFeaturedDish(): Dish {
		return DISHES.filter((dishes) => (dishes.featured))[0];
	}
}