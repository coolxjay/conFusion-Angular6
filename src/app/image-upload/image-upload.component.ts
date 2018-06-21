import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { baseURL } from '../shared/baseurl';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { of as ObservableOf, Observable, throwError, Subject } from 'rxjs';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

	public uploader:FileUploader = new FileUploader({url: this.BaseURL+'images', itemAlias: 'imageFile'});
	public addImage: EventEmitter<string> = new EventEmitter<string>();

  constructor(
		public dialogRef: MatDialogRef<ImageUploadComponent>,
		@Inject('BaseURL') private BaseURL
	) { }

  ngOnInit() {
		this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
			if( status == 200 ) {
				response = JSON.parse(response);
				this.addImage.emit(response.originalname);
				this.dialogRef.close();
			}
    };	
  }

}
