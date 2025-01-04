import {NameSpace} from '../../const.ts';
import {State} from '../../models/state.ts';

export const getFavorites = (state: State) => state[NameSpace.Favorites].favorites;

