import {createReducer} from '@reduxjs/toolkit';
import {
  addReview,
  changeOffer,
  requireAuthorization,
  setCityName,
  setCurrentOffer,
  setFavorites,
  setOffers,
  setOffersDataLoadingStatus,
  setOffersNearBy,
  setReviews,
  setUserData, unsetCurrentOffer
} from './action.ts';
import {AuthorizationStatus, CityName} from '../const.ts';
import Offer from '../models/api/offer.ts';
import {UserData} from '../models/api/user-data.ts';
import ExtendedOffer from '../models/api/extended-offer.ts';
import {ReviewData} from '../models/api/review-data.ts';

const initialState = {
  cityName: CityName.Paris,
  offers: [] as Offer[],
  currentOffer: null as ExtendedOffer | null,
  reviews: [] as ReviewData[],
  offersNearBy: [] as Offer[],
  favorites: [] as Offer[],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoadingStatus: false,
  userData: null as UserData | null
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCityName, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(unsetCurrentOffer, (state) => {
      state.currentOffer = null;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(addReview, (state, action) => {
      state.reviews.push(action.payload);
    })
    .addCase(setOffersNearBy, (state, action) => {
      state.offersNearBy = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoadingStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(changeOffer, (state, action) => {
      state.offers = state.offers
        .map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
    });
});
