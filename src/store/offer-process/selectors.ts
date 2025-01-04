import {NameSpace} from '../../const.ts';
import {State} from '../../models/state.ts';

export const getCurrentOffer = (state: State) => state[NameSpace.Offer].currentOffer;

export const getOffersNearBy = (state: State) => state[NameSpace.Offer].offersNearBy;
