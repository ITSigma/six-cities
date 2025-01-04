export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '/404'
}

export enum APIRoute {
  Offers = '/offers',
  Offer = '/offers/{offerId}',
  Comments = '/comments/{offerId}',
  OffersNearBy = 'offers/{offerId}/nearby',
  Favorites = '/favorite',
  AddToFavorites = '/favorite/{offerId}/{status}',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  Offers = 'OFFERS',
  Review = 'REVIEW',
  Favorites = 'FAVORITES',
  User = 'USER'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum CityName {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export enum SortingOption {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Top rated first'
}

export const URL_MARKER_DEFAULT = 'img/pin.svg';

export const URL_MARKER_CURRENT = 'img/pin-active.svg';
