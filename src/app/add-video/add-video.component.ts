import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Video } from '../shared/video';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {

	videos: Array<File> = [];

  constructor(
		private fileService: FileService
	) {}

  ngOnInit() {
  }
	
	public dropped(event: UploadEvent) {
		// in case of wanting only single file allowed
		// show warning message and remove all files from event.files
	
    for (const droppedFile of event.files) {
			if( droppedFile.fileEntry.isFile) {
				const video = {name: droppedFile.relativePath};
				this.fileService.postVideoInfo(video)
				.subscribe((videoInfo) => {
					const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
					fileEntry.file((file: File) => {
						const formData = new FormData();
						formData.append('videoFile', file, videoInfo._id);
						this.fileService.postVideoFile(formData)
						.subscribe(data => {
							console.log("Data :", data);
						},  (errHTML) => {
							const filename = errHTML.split('<h1>')[1].split('</h1>')[0];
							console.log("Failed on :", filename);
						});
					})
				});
			}
			else {
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
