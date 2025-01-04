import Review from './review.tsx';
import ReviewForm from './review-form.tsx';
import { useAppSelector } from '../../../hooks/use-app-selector.ts';
import { AuthorizationStatus } from '../../../const.ts';

type ReviewListProps = {
  offerId: string;
};

function ReviewList({ offerId }: ReviewListProps): JSX.Element {
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const reviews = useAppSelector((state) => state.reviews);

  const reviewsToDisplay = reviews
    .slice()
    .sort((first, second) => new Date(second.date).getTime() - new Date(first.date).getTime())
    .slice(0, 10);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviewsToDisplay.map((review) => (
          <Review review={review} key={review.id} />
        ))}
      </ul>

      {authStatus === AuthorizationStatus.Auth && <ReviewForm offerId={offerId} />}
    </section>
  );
}

export default ReviewList;
