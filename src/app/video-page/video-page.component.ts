import { Component } from '@angular/core';

@Component({
  selector: 'video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css']
})
export class VideoPageComponent {
  cards = [
    { title: 'Show Videos', cols: 1, rows: 1, link: '/showVideo' },
    { title: 'Add Videos', cols: 1, rows: 1, link: '/addVideo' },
    { title: 'Card 3', cols: 1, rows: 1, link: '' },
    { title: 'Card 4', cols: 1, rows: 1, link: '' }
  ];
}
