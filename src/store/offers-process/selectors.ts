import {NameSpace} from '../../const.ts';
import {State} from '../../models/state.ts';

export const getCityName = (state: State) => state[NameSpace.Offers].cityName;

export const getOffers = (state: State) => state[NameSpace.Offers].offers;

export const getOffersDataLoadingStatus = (state: State) =>
  state[NameSpace.Offers].isOffersDataLoadingStatus;
