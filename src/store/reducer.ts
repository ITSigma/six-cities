import {createReducer} from '@reduxjs/toolkit';
import {
  changeNearByOffer,
  setCurrentOffer,
  setOffersNearBy,
  unsetCurrentOffer
} from './action.ts';
import {AuthorizationStatus, CityName} from '../const.ts';
import Offer from '../models/api/offer.ts';
import {UserData} from '../models/api/user-data.ts';
import ExtendedOffer from '../models/api/extended-offer.ts';
import {ReviewData} from '../models/api/review-data.ts';

const initialState = {
  currentOffer: null as ExtendedOffer | null,
  offersNearBy: [] as Offer[],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(unsetCurrentOffer, (state) => {
      state.currentOffer = null;
    }).addCase(setOffersNearBy, (state, action) => {
      state.offersNearBy = action.payload;
    }).addCase(changeNearByOffer, (state, action) => {
      state.offersNearBy = state.offersNearBy
        .map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
    });
});
