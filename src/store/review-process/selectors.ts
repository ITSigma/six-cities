import {NameSpace} from '../../const.ts';
import {State} from '../../models/state.ts';

export const getReviews = (state: State) => state[NameSpace.Review].reviews;
