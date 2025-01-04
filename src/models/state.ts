import {store} from '../store';
import {AuthorizationStatus, CityName} from '../const.ts';
import {ReviewData} from './api/review-data.ts';
import {UserData} from './api/user-data.ts';
import Offer from './api/offer.ts';
import ExtendedOffer from './api/extended-offer.ts';

export type OffersProcess = {
  cityName: CityName;
  offers: Offer[];
  isOffersDataLoadingStatus: boolean;
};

export type OfferProcess = {
  currentOffer: ExtendedOffer | null;
  offersNearBy: Offer[];
};

export type FavoritesProcess = {
  favorites: Offer[];
};

export type ReviewProcess = {
  reviews: ReviewData[];
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type State = ReturnType<typeof store.getState>;

