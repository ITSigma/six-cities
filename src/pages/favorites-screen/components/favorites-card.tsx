import Offer from '../../../models/api/offer.ts';
import Bookmark from '../../../components/bookmark/bookmark.tsx';
import { memo } from 'react';

type FavoritesCardProps = {
  offer: Offer;
};

function FavoritesCard({ offer }: FavoritesCardProps): JSX.Element {
  return (
    <article className="favorites__card place-card">
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <img
          className="place-card__image"
          src={offer.previewImage}
          width={150}
          height={110}
          alt="Place image"
        />
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{offer.price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <Bookmark
            offer={offer}
            className={'place-card'}
            width={'18'}
            height={'19'}
            isCurrent={false}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${20 * offer.rating}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">{offer.title}</h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export const MemoizedFavoritesCard = memo(FavoritesCard);
