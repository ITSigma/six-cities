import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {State} from '../models/state.ts';
import {AppDispatch} from '../models/app-dispatch.ts';
import Offer from '../models/api/offer.ts';
import {APIRoute, AppRoute, AuthorizationStatus} from '../const.ts';
import {
  addReview, changeNearByOffer,
  changeOffer,
  redirectToRoute,
  requireAuthorization,
  setCurrentOffer,
  setFavorites,
  setOffers,
  setOffersDataLoadingStatus,
  setOffersNearBy,
  setReviews,
  setUserData
} from './action.ts';
import {AuthData} from '../models/api/auth-data.ts';
import {UserData} from '../models/api/user-data.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {FavoriteData} from '../models/api/favorite-data.ts';
import ExtendedOffer from '../models/api/extended-offer.ts';
import {ReviewData} from '../models/api/review-data.ts';
import {NewReviewData} from '../models/api/new-review-data.ts';


type ThunkConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export const fetchOffersAction = createAsyncThunk<void, undefined, ThunkConfig> (
  'offers/fetch',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setOffers(data));
  },
);

export const fetchOffersNearBy = createAsyncThunk<void, { offerId: string }, ThunkConfig> (
  'offers/fetchNearBy',
  async ({offerId}, {dispatch, extra: api}) => {
    const route = APIRoute.OffersNearBy.replace('{offerId}', offerId);
    const {data} = await api.get<Offer[]>(route);
    dispatch(setOffersNearBy(data));
  },
);

export const fetchReviews = createAsyncThunk<void, { offerId: string }, ThunkConfig> (
  'reviews/fetch',
  async ({offerId}, {dispatch, extra: api}) => {
    const route = APIRoute.Comments.replace('{offerId}', offerId);
    const {data} = await api.get<ReviewData[]>(route);
    dispatch(setReviews(data));
  },
);

export const publishReview = createAsyncThunk<void, NewReviewData, ThunkConfig> (
  'reviews/publish',
  async (newReview, {dispatch, extra: api}) => {
    const route = APIRoute.Comments.replace('{offerId}', newReview.offerId);
    const {data} = await api.post<ReviewData>(route, {
      rating: newReview.rating,
      comment: newReview.comment
    });
    dispatch(addReview(data));
  },
);


export const fetchCurrentOfferAction = createAsyncThunk<void, { offerId: string }, ThunkConfig> (
  'offers/fetchCurrentData',
  async (arg, {dispatch, extra: api}) => {
    try {
      const route = APIRoute.Offer.replace('{offerId}', arg.offerId);
      const {data} = await api.get<ExtendedOffer>(route);
      dispatch(setCurrentOffer(data));
      dispatch(fetchOffersNearBy(arg));
      dispatch(fetchReviews(arg));
    } catch {
      dispatch(redirectToRoute(AppRoute.NotFound));
    }
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, ThunkConfig> (
  'favorites/fetch',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Favorites);
    dispatch(setFavorites(data));
  }
);

export const changeFavoriteStatusAction = createAsyncThunk<void, FavoriteData, ThunkConfig> (
  'favorites/changeStatus',
  async ({offerId, status}, {dispatch, extra: api}) => {
    const route = APIRoute.AddToFavorites
      .replace('{offerId}', offerId)
      .replace('{status}', `${status}`);
    const {data} = await api.post<Offer>(route);

    dispatch(changeOffer(data));
    dispatch(fetchFavoritesAction());
    dispatch(changeNearByOffer(data));
  }
);

export const changeCurrentFavoriteStatusAction = createAsyncThunk<void, FavoriteData, ThunkConfig> (
  'favorites/changeCurrentStatus',
  async ({offerId, status}, {dispatch, extra: api}) => {
    const route = APIRoute.AddToFavorites
      .replace('{offerId}', offerId)
      .replace('{status}', `${status}`);
    const {data} = await api.post<Offer>(route);

    dispatch(changeOffer(data));
    dispatch(fetchFavoritesAction());
    dispatch(changeNearByOffer(data));
    dispatch(fetchCurrentOfferAction({offerId}));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(setUserData(data));
      dispatch(fetchOffersAction());
      dispatch(fetchFavoritesAction());
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserData(data));
    dispatch(fetchOffersAction());
    dispatch(fetchFavoritesAction());
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUserData(null));
    dispatch(fetchOffersAction());
    dispatch(setFavorites([]));
  },
);
