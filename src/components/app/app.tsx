import MainScreen from '../../pages/main-screen/main-screen.tsx';
import {Route, Routes} from 'react-router-dom';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen.tsx';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import LoginScreen from '../../pages/login-screen/login-screen.tsx';
import OfferScreen from '../../pages/offer-screen/offer-screen.tsx';
import PrivateRoute from '../private-route/private-route.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import LoadingScreen from '../../pages/loading-screen/loading-screen.tsx';
import HistoryRouter from '../history-route/history-route.tsx';
import browserHistory from '../../services/browser-history.ts';
import {getAuthorizationStatus} from '../../store/offer-process/selectors.ts';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoadingStatus = useAppSelector((state) => state.isOffersDataLoadingStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoadingStatus) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<MainScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={authorizationStatus}>
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen />}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
