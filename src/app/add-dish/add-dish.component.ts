import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ImageUploadComponent } from '../image-upload/image-upload.component';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.scss']
})
export class AddDishComponent implements OnInit {

	dishForm: FormGroup;
	dish: Dish;
	dialogRef: MatDialogRef<ImageUploadComponent>
	image: string = undefined;
	isSubmitted: boolean = false;
	
  constructor(
		private fb: FormBuilder,
		private dishService: DishService,
		private dialog: MatDialog
	) { 
		this.createForm();
	}

  ngOnInit() {
  }
	
	createForm(): void {
		this.dishForm = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(25)]],
			description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
			category: ['', [Validators.required, Validators.maxLength(25)]],
			price: ['', [Validators.required, Validators.maxLength(7)]],
			label: ['', [Validators.required, Validators.maxLength(25)]],
			featured: false
		})
	}
	
	onSubmit(): void {
		this.dish = this.dishForm.value;
		this.dish.image = this.image;
		console.log("this.dish :", this.dish);
		this.dishService.postDish(this.dish)
		.subscribe(dish => {
			this.dish = dish;
			this.isSubmitted = true;
			this.dishForm.reset({
				name: '',
				image: '',
				price: '',
				label: '',
				description: '',
				featured: false,
				category: ''
			});
		}, (err) => {
			// do nothing
			this.isSubmitted = false;
		} )
		
	}
	
	openImageForm(): void {
		this.dialogRef = this.dialog.open(ImageUploadComponent, {width: '500px', height: '450px' });
		this.dialogRef.componentInstance.addImage
		.subscribe(name => this.image = 'images/' + name);
	}
	
}
