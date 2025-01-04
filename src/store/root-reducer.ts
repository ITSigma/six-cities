import {NameSpace} from '../const.ts';
import {combineReducers} from '@reduxjs/toolkit';
import {userProcess} from './user-process/user-process.ts';
import {reviewProcess} from './review-process/review-process.ts';
import {favoritesProcess} from './favorites-process/favorites-process.ts';
import {offersProcess} from './offers-process/offers-process.ts';
import {offerProcess} from './offer-process/offer-process.ts';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Offer]: offerProcess.reducer,
  [NameSpace.Favorites]: favoritesProcess.reducer,
  [NameSpace.Review]: reviewProcess.reducer,
  [NameSpace.User]: userProcess.reducer
});
