import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { UploadEvent, UploadFile } from 'ngx-file-drop';

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
	public files: UploadFile[] = [];
	
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
	
	public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
 
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
 
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
 
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
 
  public fileOver(event){
    console.log(event);
  }
 
  public fileLeave(event){
    console.log(event);
  }
	
}
