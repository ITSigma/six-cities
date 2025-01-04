import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import Location from '../../models/location.ts';
import Point from '../../models/point.ts';

type MapProps = {
  mainLocation: Location;
  points: Point[];
  selectedOfferId: string | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({mainLocation, points, selectedOfferId}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, mainLocation);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((offerLocation) => {
        const marker = new Marker({
          lat: offerLocation.location.latitude,
          lng: offerLocation.location.longitude
        });

        marker
          .setIcon(
            selectedOfferId !== null && offerLocation.id === selectedOfferId
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedOfferId]);

  return <div style={{height: '100%'}} ref={mapRef}></div>;
}

export default Map;
