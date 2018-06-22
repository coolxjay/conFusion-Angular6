import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { FileService } from '../services/file.service';

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
	
	// For Dish JSON format file Upload
	public files: UploadFile[] = [];
	filesToUpload: Array<File> = [];
	
	// For Image Drop Zone
	
	dishes: Dish[] = [];
	
  constructor(
		private fb: FormBuilder,
		private dishService: DishService,
		private dialog: MatDialog,
		private fileService: FileService
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
	
	
	/***************** File Drop Zone ********************/
	public dropped(event: UploadEvent) {
		// in case of wanting only single file allowed
		// show warning message and remove all files from event.files
	
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
					const formData = new FormData();
					formData.append('imageFile', file, droppedFile.relativePath);
					this.fileService.postImageFile(formData)
					.subscribe(data => {
						console.log("Data :", data);
					}, (errHTML) => {
						const filename = errHTML.split('<h1>')[1].split('</h1>')[0];
						console.log("Failed on :", filename);
					});
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
	
	//********************************//
	uploadDishesInFile(): void {
		var self = this;
		var reader = new FileReader();
		reader.readAsText(self.filesToUpload[0]);
		
		reader.onload = function(e) {
			self.dishes = JSON.parse(reader.result);
			self.sendDishInfo(self.dishes);
		}
	}
	
	fileChangeEvent(fileInput: any) {
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
	
	sendDishInfo(dishes: Dish[]): void {
		for(var i=0; i<dishes.length; i++) {
			this.dishService.postDish(dishes[i])
			.subscribe(dish => console.log(dish));
		}
	}
	
	
}
