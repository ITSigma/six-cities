import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const.ts';
import Offer from '../models/api/offer.ts';
import ExtendedOffer from '../models/api/extended-offer.ts';

export const redirectToRoute = createAction<AppRoute>('route/redirect');

export const setCurrentOffer = createAction<ExtendedOffer>('offers/setCurrent');

export const unsetCurrentOffer = createAction('offers/unsetCurrent');


export const setOffersNearBy = createAction<Offer[]>('offers/setNearBy');

export const changeNearByOffer = createAction<Offer>('offers/changeNearBy');
