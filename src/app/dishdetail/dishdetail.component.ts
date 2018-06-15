import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

	dish: Dish;

  constructor(
		private dishService: DishService,
		private route: ActivatedRoute,
		private location: Location
	) { }

  ngOnInit() {
		let id = +this.route.snapshot.params['id'];
		this.dish = this.dishService.getDish(id);
		/*
		this.route.params.switchMap((params: Params) => { 
			return this.dishService.getDish(params['id']);
		})
		.subscribe(dish => {
			this.dish = dish; 
		});
		*/
  }

}