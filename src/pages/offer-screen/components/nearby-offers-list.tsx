import Offer from '../../../models/api/offer.ts';
import { MemoizedOfferCard } from '../../../components/offer-card/offer-card.tsx';
import { AppRoute } from '../../../const.ts';
import { Link } from 'react-router-dom';

type NearbyOffersListProps = {
  nearbyOffers: Offer[];
};

function NearbyOffersList({ nearbyOffers }: NearbyOffersListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {nearbyOffers.map((offer) => (
        <Link to={AppRoute.Offer.replace(':id', offer.id)} key={offer.id} className="places__list-item">
          <MemoizedOfferCard
            key={offer.id}
            offer={offer}
          />
        </Link>
      ))}
    </div>
  );
}

export default NearbyOffersList;
