import {createAction} from '@reduxjs/toolkit';
import {AppRoute, AuthorizationStatus, CityName} from '../const.ts';
import Offer from '../models/api/offer.ts';
import {UserData} from '../models/api/user-data.ts';
import ExtendedOffer from '../models/api/extended-offer.ts';
import {ReviewData} from '../models/api/review-data.ts';

export const redirectToRoute = createAction<AppRoute>('route/redirect');

export const setCityName = createAction<CityName>('city/set');

export const setOffers = createAction<Offer[]>('offers/set');

export const setCurrentOffer = createAction<ExtendedOffer>('offers/setCurrent');

export const unsetCurrentOffer = createAction('offers/unsetCurrent');

export const setReviews = createAction<ReviewData[]>('reviews/set');

export const addReview = createAction<ReviewData>('reviews/add');


export const setOffersNearBy = createAction<Offer[]>('offers/setNearBy');

export const changeNearByOffer = createAction<Offer>('offers/changeNearBy');

export const changeOffer = createAction<Offer>('offers/change');

export const setOffersDataLoadingStatus = createAction<boolean>('offers/setDataLoadingStatus');

export const setFavorites = createAction<Offer[]>('favorites/set');

export const setUserData = createAction<UserData | null>('user/setData');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

