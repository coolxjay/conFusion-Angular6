import { Component, Inject } from '@angular/core';

@Component({
  selector: 'dish-page',
  templateUrl: './dish-page.component.html',
  styleUrls: ['./dish-page.component.css']
})
export class DishPageComponent {
  cards = [
    { title: 'Add a New Dish', cols: 1, rows: 1, link: '/addDish' },
    { title: 'Card 2', cols: 1, rows: 1, link: '' },
    { title: 'Card 3', cols: 1, rows: 1, link: '' },
    { title: 'Card 4', cols: 1, rows: 1, link: '' }
  ];
	
	constructor(
		@Inject('BaseURL') public BaseURL
	) {}
}
