import { useState, useEffect } from 'react';
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import classes from './map.module.css';

interface MapComponentProps {
  latitude: number | null;
  longitude: number | null;
}

const MapComponent: React.FC<MapComponentProps> = ({ latitude, longitude }) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;
  // Use state to manage the map's view state
  // Provide default fallback values for latitude and longitude
  const defaultLatitude = 0; // Example default value, adjust as needed
  const defaultLongitude = 0; // Example default value, adjust as needed

  const [viewState, setViewState] = useState({
    latitude: latitude ?? defaultLatitude,
    longitude: longitude ?? defaultLongitude,
    zoom: 10,
  });
  // Update the view state when latitude or longitude props change
  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      setViewState((currentViewState) => ({
        ...currentViewState,
        latitude,
        longitude,
      }));
    }
  }, [latitude, longitude]);

  return (
    <div className={classes.mainStyle}>
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: '100%', height: '100%' }}
        {...viewState} // Spread the viewState object here
        onMove={(evt) => setViewState(evt.viewState)} // Update view state on map move
        maxZoom={20}
        minZoom={3}
      >
        {/* Conditionally render the Marker only if latitude and longitude are not null */}
        {latitude && longitude && (
          <Marker latitude={latitude} longitude={longitude} />
        )}
      </Map>
    </div>
  );
};

export default MapComponent;
