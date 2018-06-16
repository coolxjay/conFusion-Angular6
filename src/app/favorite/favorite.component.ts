
import { Component, OnInit, Inject } from '@angular/core';
import { Favorite } from '../shared/favorite';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})

export class FavoriteComponent implements OnInit {

	favorites: Favorite;
	delete: Boolean;

  constructor(
		private favoriteService: FavoriteService,
		@Inject('BaseURL') public BaseURL
	) { }

  ngOnInit() {
		this.favoriteService.getFavorites()
		.subscribe(favorites => this.favorites = favorites);
  }
	
	deleteFavorite(id: string) {
		this.favoriteService.deleteFavorite(id)
		.subscribe(favorite => this.ngOnInit()));
	}

}
