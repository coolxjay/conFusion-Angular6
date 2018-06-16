import { User } from './user';
import { Dish } from './dish';

export class Favorite {
	_id: string;
	user: User;
	dishes: Dish[];
}
