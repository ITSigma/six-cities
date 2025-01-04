import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import LoginForm from './components/login-form.tsx';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useEffect} from 'react';
import {getAuthorizationStatus} from '../../store/offer-process/selectors.ts';

function LoginScreen() : JSX.Element {
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, navigate]);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Root} className="header__logo-link">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginScreen;
