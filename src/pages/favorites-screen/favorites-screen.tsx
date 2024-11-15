﻿import Offer from '../../models/offer.ts';
import FavoritesList from './components/favorites-list.tsx';
import Header from '../../components/header/header.tsx';
import {AppRoutes} from '../../components/app/AppRoutes.ts';
import {Link} from 'react-router-dom';

type FavoritesScreenProps = {
  offers: Offer[];
};

function FavoritesScreen({ offers }: FavoritesScreenProps): JSX.Element {
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {offers.length > 0 ? (
            <FavoritesList offers={offers} />
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Nothing yet saved</h1>
            </section>
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoutes.Root} className="footer__logo-link">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesScreen;
