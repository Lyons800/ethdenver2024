import type { SetStateAction } from 'react';
import { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import ReactMapGL from 'react-map-gl';

export default function Map() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    // The latitude and longitude of the center of London
    latitude: 51.5074,
    longitude: -0.1278,
    zoom: 10,
  });
  return (
    // <ReactMapGL
    //   mapStyle="mapbox://styles/mapbox/streets-v11"
    //   mapboxApiAccessToken={process.env.MAPBOX_KEY}
    //   {...viewport}
    // //   onViewportChange={(
    // //     nextViewport: SetStateAction<{
    // //       width: string;
    // //       height: string;
    // //       // The latitude and longitude of the center of London
    // //       latitude: number;
    // //       longitude: number;
    // //       zoom: number;
    // //     }>
    // //   ) => setViewport(nextViewport)}
    // />
    <div>Map</div>
  );
}
