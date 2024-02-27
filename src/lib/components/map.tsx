// Import Marker from 'react-map-gl'
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import classes from './map.module.css';

const MapComponent = ({ latitude, longitude }) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;

  return (
    <div className={classes.mainStyle}>
      <Map
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: '100%', height: '100%' }}
        initialViewState={{
          latitude,
          longitude,
          zoom: 10,
        }}
        maxZoom={20}
        minZoom={3}
      >
        {/* Add a marker at the given coordinates */}
        <Marker latitude={latitude} longitude={longitude} />
      </Map>
    </div>
  );
};

export default MapComponent;
