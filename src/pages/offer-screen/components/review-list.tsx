import Review from './review.tsx';
import ReviewForm from './review-form.tsx';
import {useAppSelector} from '../../../hooks/use-app-selector.ts';

type ReviewListProps = {
  offerId: string;
};

function ReviewList({offerId}: ReviewListProps): JSX.Element {
  const reviews = useAppSelector((state) => state.reviews);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </ul>

      <ReviewForm offerId={offerId} />
    </section>
  );
}

export default ReviewList;
