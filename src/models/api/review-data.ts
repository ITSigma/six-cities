import {ExternalUserData} from './user-data.ts';

export type ReviewData = {
  id: string;
  date: string;
  user: ExternalUserData;
  comment: string;
  rating: number;
}
