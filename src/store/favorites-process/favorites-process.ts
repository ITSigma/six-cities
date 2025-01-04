import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { FavoritesProcess } from '../../models/state.ts';
import {NameSpace} from '../../const.ts';
import Offer from '../../models/api/offer.ts';

const initialState: FavoritesProcess = {
  favorites: []
};

export const favoritesProcess = createSlice({
  name: NameSpace.Favorites,
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Offer[]>) => {
      state.favorites = action.payload;
    }
  }
});

export const {setFavorites} = favoritesProcess.actions;
