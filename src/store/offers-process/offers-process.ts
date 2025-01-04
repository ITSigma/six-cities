import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { OffersProcess } from '../../models/state.ts';
import {CityName, NameSpace} from '../../const.ts';
import Offer from '../../models/api/offer.ts';

const initialState: OffersProcess = {
  cityName: CityName.Paris,
  offers: [],
  isOffersDataLoadingStatus: false
};

export const offersProcess = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {
    setOffersCityName: (state, action: PayloadAction<CityName>) => {
      state.cityName = action.payload;
    },
    setOffers: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    changeOffer: (state, action: PayloadAction<Offer>) => {
      state.offers = state.offers
        .map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
    },
    setOffersDataLoadingStatus: (state, action: PayloadAction<boolean>) => {
      state.isOffersDataLoadingStatus = action.payload;
    }
  }
});

export const {
  setOffersCityName,
  setOffers,
  changeOffer,
  setOffersDataLoadingStatus
} = offersProcess.actions;
