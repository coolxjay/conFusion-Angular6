import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DishService } from '../services/dish.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

	dish: Dish;
	commentForm: FormGroup;
	comment: Comment;
	username: string = undefined;
	subscription: Subscription;

  constructor(
		private dishService: DishService,
		private route: ActivatedRoute,
		private location: Location,
		private fb: FormBuilder,
		@Inject('BaseURL') public BaseURL,
		private authService: AuthService,
		private favoriteService: FavoriteService,
		private router: Router
	) {
		this.createForm();
	}

  ngOnInit() {
		this.route.params
		.pipe(
			map((params:Params) => params['id']),
			switchMap((id:number) => this.dishService.getDish(id))
		)
		.subscribe(dish => {
				this.dish = dish;
				console.log("dish :", this.dish);
	
		});
		this.subscription = this.authService.getUserInfo()
	 	.subscribe(userInfo => { 
								this.username = userInfo.username; 
								console.log("username :", this.username); 
							})
		
  }
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
		this.username = undefined;
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
		this.dishService.postComment(this.dish._id, this.comment)
		.subscribe((dish) => {
			this.commentForm.reset({
				rating: 5,
				name: '',
				comment: ''
			});
			this.ngOnInit();
		}, (err) => {
			
		});
		
	}
	
	addFavorite(dish: Dish) {
		this.favoriteService.postFavorite(dish._id)
		.subscribe(res => {
			this.router.navigate(['/menu']);
		}, (err) => {
			// do nothing
		});
	}

}


