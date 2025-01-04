import Offer from '../../../models/api/offer.ts';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const.ts';
import { MemoizedFavoritesCard } from './favorites-card.tsx';

type FavoritesListProps = {
  offers: Offer[];
};

function FavoritesList({ offers }: FavoritesListProps): JSX.Element {
  const cities = Array.from(new Set(offers.map((offer) => offer.city.name)));

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cities.map((city) => (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <div className="locations__item-link">
                  <span>{city}</span>
                </div>
              </div>
            </div>
            <div className="favorites__places">
              {offers
                .filter((offer) => offer.city.name === city)
                .map((offer) => (
                  <Link to={AppRoute.Offer.replace(':id', offer.id)} key={offer.id} className="places__list-item">
                    <MemoizedFavoritesCard offer={offer} />
                  </Link>
                ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FavoritesList;
