import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OfferProcess} from '../../models/state.ts';
import {AppRoute, NameSpace} from '../../const.ts';
import ExtendedOffer from '../../models/api/extended-offer.ts';
import Offer from '../../models/api/offer.ts';
import {fetchCurrentOfferAction} from '../api-actions.ts';
import {redirectToRoute} from '../action.ts';

const initialState: OfferProcess = {
  currentOffer: null,
  offersNearBy: []
};

export const offerProcess = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {
    setCurrentOffer: (state, action: PayloadAction<ExtendedOffer>) => {
      state.currentOffer = action.payload;
    },
    unsetCurrentOffer: (state) => {
      state.currentOffer = null;
    },
    setOffersNearBy: (state, action: PayloadAction<Offer[]>) => {
      state.offersNearBy = action.payload;
    },
    changeNearByOffer: (state, action: PayloadAction<Offer>) => {
      state.offersNearBy = state.offersNearBy
        .map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentOfferAction.rejected, () => {
        redirectToRoute(AppRoute.NotFound);
      });
  }
});

export const {
  setCurrentOffer,
  unsetCurrentOffer,
  setOffersNearBy,
  changeNearByOffer
} = offerProcess.actions;
