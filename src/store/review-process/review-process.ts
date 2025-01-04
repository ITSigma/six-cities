import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { ReviewProcess } from '../../models/state.ts';
import { ReviewData } from '../../models/api/review-data.ts';
import {NameSpace} from '../../const.ts';

const initialState: ReviewProcess = {
  reviews: []
};

export const reviewProcess = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {
    setReviews: (state, action: PayloadAction<ReviewData[]>) => {
      state.reviews = action.payload;
    },
    addReview: (state, action: PayloadAction<ReviewData>) => {
      state.reviews.push(action.payload);
    }
  }
});

export const {setReviews, addReview} = reviewProcess.actions;
