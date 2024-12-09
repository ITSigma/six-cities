﻿import Offer from '../../models/api/offer.ts';
import OffersList from './components/offers-list.tsx';
import Header from '../../components/header/header.tsx';
import Map from '../../components/map/map.tsx';
import {useState} from 'react';
import {CityName, SortingOption} from '../../const.ts';
import {useAppSelector} from '../../hooks/use-app-selector.ts';
import {useAppDispatch} from '../../hooks/use-app-dispatch.ts';
import {setCityName} from '../../store/action.ts';
import CitiesList from './components/cities-list.tsx';
import SortingOptionsForm from './components/sorting-options-form.tsx';
import {sortOffers} from './sort-offers.ts';


function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);
  const currentCityName = useAppSelector((state) => state.cityName);

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [sortingOption, setSortingOption] = useState<SortingOption>(SortingOption.Popular);

  const cityOffers = offers.filter((offer) => offer.city.name === currentCityName);
  const sortedCityOffers = sortOffers(sortingOption, cityOffers);

  const handleCityNameChange = (city: CityName) => {
    dispatch(setCityName(city));
  };

  const handleOptionChange = (option: SortingOption) => {
    setSortingOption(option);
  };

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList
          current={currentCityName}
          onCityNameChange={handleCityNameChange}
        />
        <div className="cities">
          <div className="cities__places-container container">
            {cityOffers.length > 0 ? (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {cityOffers.length} places to stay in {currentCityName}
                </b>
                <SortingOptionsForm onOptionChange={handleOptionChange}/>
                <OffersList offers={sortedCityOffers} onOfferHover={setSelectedOffer} />
              </section>
            ) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">No places to stay available</b>
              </section>
            )}
            <div className="cities__right-section">

              <section className="cities__map map">
                {cityOffers.length > 0 ? (
                  <Map
                    mainLocation={cityOffers[0].city.location}
                    offers={cityOffers}
                    selectedOffer={selectedOffer}
                  />
                ) : (
                  <img src="img/map.jpg" alt="No map available"/>
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
