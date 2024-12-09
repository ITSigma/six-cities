﻿import { Link } from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {logoutAction} from '../../store/api-actions.ts';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();

  const favorites = useAppSelector((state) => state.favorites);
  const userData = useAppSelector((state) => state.userData);

  const handleSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {userData !== null ?
                <li className="header__nav-item user">
                  <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">{userData.email}</span>
                    <span className="header__favorite-count">{favorites.length}</span>
                  </Link>
                  <span
                    className="header__signout"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </span>
                </li>
                :
                <li className="header__nav-item">
                  <Link to={AppRoute.Login} className="header__nav-link">
                    <span className="header__signin">Sign in</span>
                  </Link>
                </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
