import { ReviewData } from '../../../models/api/review-data.ts';
import { memo } from 'react';

type ReviewProps = {
  review: ReviewData;
};

function Review({ review }: ReviewProps): JSX.Element {
  const { user, comment, rating, date } = review;
  const reviewDate = new Date(date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width={54}
            height={54}
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${20 * rating}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={reviewDate.toISOString()}>
          {reviewDate.toLocaleString('en', { month: 'long', year: 'numeric' })}
        </time>
      </div>
    </li>
  );
}

export const MemoizedReview = memo(Review);
