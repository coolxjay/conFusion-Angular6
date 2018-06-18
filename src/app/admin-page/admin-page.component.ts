import { Component } from '@angular/core';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  cards = [
    { title: 'User Information', cols: 1, rows: 1, link: '/userPage' },
    { title: 'Dish Information', cols: 1, rows: 1, link: ''},
    { title: 'Card 3', cols: 1, rows: 1, link: ''},
    { title: 'Card 4', cols: 1, rows: 1, link: '' }
  ];
}
