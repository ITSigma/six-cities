﻿import React, {ChangeEvent, useState} from 'react';
import {ratingsData} from '../rating-data.ts';
import {NewReviewData, ReviewData} from '../../../models/api/review-data.ts';
import reviewsMock from '../../../mocks/reviews-mock.ts';

type OfferScreenProps = {
  onSubmit: (newReview: ReviewData) => void;
};

function ReviewForm({ onSubmit } : OfferScreenProps): JSX.Element {
  const initialFormState = {
    rating: 0,
    comment: '',
  };

  const [formState, setFormState] = useState<NewReviewData>(initialFormState);

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const review : ReviewData = {
      id : crypto.randomUUID(),
      date: new Date(),
      user: reviewsMock[0].user,
      comment: formState.comment,
      rating: formState.rating
    };

    onSubmit(review);

    setFormState(initialFormState);
  };

  return (
    <form
      className="reviews__form form"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating ">
        {ratingsData.map((ratingData) => (
          <div key={ratingData.rating}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={ratingData.rating}
              id={`${ratingData.rating}-stars`}
              type="checkbox"
              checked={ratingData.rating <= formState.rating}
              onChange={handleChange}
            />
            <label
              htmlFor={`${ratingData.rating}-stars`}
              className="reviews__rating-label form__rating-label"
              title={ratingData.ratingTranscript}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"/>
              </svg>
            </label>
          </div>
        ))}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="comment"
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formState.comment}
        onChange={handleChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!formState.rating || formState.comment.length < 50 || formState.comment.length > 300}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;
