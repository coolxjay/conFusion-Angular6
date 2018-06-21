import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  constructor(
		@Inject('BaseURL') public BaseURL
	) { }

  ngOnInit() {
  }

}
