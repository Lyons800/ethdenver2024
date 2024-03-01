// Import Marker from 'react-map-gl'
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import classes from './map.module.css';

const MapComponent = ({ latitude, longitude }) => {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;
  export default function MapComponent({ latitude, longitude, token }) {
    const mapRef = useRef(null);
    const [viewState, setViewState] = useState({
      latitude: 35.668641, // Default latitude
      longitude: 139.750567, // Default longitude
      zoom: 10,
    });

    useEffect(() => {
      if (latitude && longitude) {
        setViewState({
          ...viewState,
          latitude,
          longitude,
        });
      }
    }, [latitude, longitude]);

    return (
      <Map
        ref={mapRef}
        mapboxAccessToken={token}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: '100%', height: '100%' }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
      >
        {latitude && longitude && (
          <Marker latitude={latitude} longitude={longitude} />
        )}
      </Map>
    );
  }
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
