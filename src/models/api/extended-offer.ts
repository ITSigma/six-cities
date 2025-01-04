import AccommodationType from '../accommodation-type.ts';
import Location from '../location.ts';
import City from '../city.ts';
import {ExternalUserData} from './user-data.ts';

type ExtendedOffer = {
  id : string;
  title: string;
  description: string;
  type: AccommodationType;
  price: number;
  images: string[];
  city: City;
  location: Location;
  goods: string[];
  host: ExternalUserData;
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  bedrooms: number;
  maxAdults: number;
}

export default ExtendedOffer;
