import { Component, Inject, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { Video } from '../shared/video';
import { baseURL } from '../shared/baseurl';

@Component({
  selector: 'show-video',
  templateUrl: './show-video.component.html',
  styleUrls: ['./show-video.component.css']
})
export class ShowVideoComponent {
 
	videos: Video[] = [];
	cards: Array<any> = [];
	
	constructor(
		@Inject('BaseURL') public BaseURL,
		private fileService: FileService
	)
	{}
	
	ngOnInit() {
		this.fileService.getVideoInfo()
		.subscribe((videoInfos) => {
			this.videos = videoInfos;
			for(var i=0; i<this.videos.length; i++) {
				const card = {
					title: this.videos[i].name,
					cols: 1,
					rows: 1,
					link: baseURL + 'videos/' + this.videos[i]._id
				}
				this.cards.push(card);
			}
		})
	}
	
	
	
}
