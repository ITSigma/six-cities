import Header from '../../components/header/header.tsx';
import ReviewList from './components/review-list.tsx';
import Map from '../../components/map/map.tsx';
import NearbyOffersList from './components/nearby-offers-list.tsx';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import LoadingScreen from '../loading-screen/loading-screen.tsx';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { fetchCurrentOfferAction } from '../../store/api-actions.ts';
import { useEffect } from 'react';
import Bookmark from '../../components/bookmark/bookmark.tsx';
import {unsetCurrentOffer} from '../../store/offer-process/offer-process.ts';
import {getCurrentOffer, getOffersNearBy} from '../../store/offer-process/selectors.ts';

function OfferScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  const currentOffer = useAppSelector(getCurrentOffer);
  const nearbyOffers = useAppSelector(getOffersNearBy).slice(0, 3);

  const params = useParams();
  const offerId = params.id;

  useEffect(() => {
    if (offerId) {
      dispatch(fetchCurrentOfferAction({ offerId }));
    }

    return () => {
      dispatch(unsetCurrentOffer());
    };
  }, [offerId, dispatch]);

  if (!currentOffer) {
    return <LoadingScreen />;
  }

  const point = {
    id: currentOffer.id,
    location: currentOffer.location
  };

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer.images.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt={'Photo studio'} />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <Bookmark
                  offer={currentOffer}
                  className={'offer'}
                  width={'31'}
                  height={'33'}
                  isCurrent
                />
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${currentOffer.rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{currentOffer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">{currentOffer.bedrooms} Bedrooms</li>
                <li className="offer__feature offer__feature--adults">Max {currentOffer.maxAdults} adults</li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">€{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">{good}</li>
                  ))}
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="offer__avatar user__avatar"
                      src={currentOffer.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="offer__user-name">{currentOffer.host.name}</span>
                  <span className="offer__user-status">{currentOffer.host.isPro && 'Pro'}</span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">{currentOffer.description}</p>
                </div>
              </div>

              <ReviewList offerId={currentOffer.id} />
            </div>
          </div>

          <section className="offer__map map">
            <Map
              mainLocation={currentOffer.location}
              points={nearbyOffers
                .map((offer) => ({
                  location: offer.location,
                  id: offer.id,
                }))
                .concat(point)}
              selectedOfferId={currentOffer.id}
            />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearbyOffersList nearbyOffers={nearbyOffers} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
