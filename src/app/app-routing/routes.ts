import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { FavoriteComponent } from '../favorite/favorite.component';
import { UserPageComponent } from '../user-page/user-page.component';
import { AdminPageComponent } from '../admin-page/admin-page.component';
import { DishPageComponent } from '../dish-page/dish-page.component';
import { AddDishComponent } from '../add-dish/add-dish.component';
import { VideoComponent } from '../video/video.component';
import { AddVideoComponent } from '../add-video/add-video.component';
import { VideoPageComponent } from '../video-page/video-page.component';
import { ShowVideoComponent } from '../show-video/show-video.component';
import { ScreenRecorderComponent } from '../screen-recorder/screen-recorder.component';

export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
	{ path: 'contact',     component: ContactComponent },
	{ path: 'about',     component: AboutComponent },
	{ path: 'dishdetail/:id', component: DishdetailComponent },
	{ path: 'favorite', component: FavoriteComponent },
	{ path: 'adminPage', component: AdminPageComponent },
	{ path: 'userPage', component: UserPageComponent },
	{ path: 'dishPage', component: DishPageComponent },
	{ path: 'addDish', component: AddDishComponent },
	{ path: 'video', component: VideoComponent },
	{ path: 'addVideo', component: AddVideoComponent },
	{ path: 'videoPage', component: VideoPageComponent },
	{ path: 'showVideo', component: ShowVideoComponent },
	{ path: 'recordScreen', component: ScreenRecorderComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
