import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { baseURL } from '../shared/baseurl';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = baseURL + 'imageUpload';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

	public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'imageFile'});

  constructor() { }

  ngOnInit() {
		this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };	
  }

}