import { MemoizedOfferCard } from '../../../components/offer-card/offer-card.tsx';
import Offer from '../../../models/api/offer.ts';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const.ts';

type OffersListProps = {
  offers: Offer[];
  onOfferHover: (offer: Offer | null) => void;
};

function OffersList({ offers, onOfferHover }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Link to={AppRoute.Offer.replace(':id', offer.id)} key={offer.id} className="places__list-item">
          <MemoizedOfferCard
            offer={offer}
            onMouseOver={() => onOfferHover(offer)}
            onMouseOut={() => onOfferHover(null)}
          />
        </Link>
      ))}
    </div>
  );
}

export default OffersList;
