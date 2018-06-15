import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

	title: string = 'UNIST';
  lat: number = 35.571767;
  lng: number = 129.187371;

  constructor() { }

  ngOnInit() {
  }

}
