import React, {useCallback} from 'react';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {FavoriteData} from '../../models/api/favorite-data.ts';
import {
  changeCurrentFavoriteStatusAction,
  changeFavoriteStatusAction
} from '../../store/api-actions.ts';
import Offer from '../../models/api/offer.ts';
import {AuthorizationStatus} from '../../const.ts';
import ExtendedOffer from '../../models/api/extended-offer.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';

type ReviewListProps = {
  offer: Offer | ExtendedOffer;
  className: string;
  width: string;
  height: string;
  isCurrent: boolean;
};

function Bookmark({offer, className, width, height, isCurrent}: ReviewListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const authStatus = useAppSelector(getAuthorizationStatus);

  const handleBookmarkClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    if (authStatus !== AuthorizationStatus.Auth){
      return;
    }

    const newStatus = offer.isFavorite ? 0 : 1;
    const favoriteData : FavoriteData = {
      offerId: offer.id,
      status: newStatus
    };

    if (isCurrent) {
      dispatch(changeCurrentFavoriteStatusAction(favoriteData));
    } else {
      dispatch(changeFavoriteStatusAction(favoriteData));
    }
  }, [authStatus, dispatch, isCurrent, offer.id, offer.isFavorite]);

  return (
    <button
      className={`${className}__bookmark-button ${offer.isFavorite && `${className}__bookmark-button--active`} button`}
      type='button'
      onClick={handleBookmarkClick}
    >
      <svg className={`${className}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default Bookmark;
