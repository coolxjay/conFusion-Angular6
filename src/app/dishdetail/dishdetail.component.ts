import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

	dish: Dish;
	commentForm: FormGroup;
	comment: Comment;

  constructor(
		private dishService: DishService,
		private route: ActivatedRoute,
		private location: Location,
		private fb: FormBuilder,
		@Inject('BaseURL') public BaseURL
	) {
		this.createForm();
	}

  ngOnInit() {
		this.route.params
		.pipe(
			map((params:Params) => params['id']),
			switchMap((id:number) => this.dishService.getDish(id))
		)
		.subscribe(dish => this.dish = dish);
  }
	
	createForm() {
		this.commentForm = this.fb.group({
			rating: 5,
			name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
			comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
		})
	}
	
	onSubmit() {
		this.comment = this.commentForm.value;
		this.comment.date = Date.now();
		console.log(this.comment);
		this.commentForm.reset({
			rating: 5,
			name: '',
			comment: ''
		})
	}

}
