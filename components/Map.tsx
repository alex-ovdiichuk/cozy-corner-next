"use client";

import GlMap, { Marker } from "react-map-gl";
import { useRef } from "react";

import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  center?: [number, number];
}

export const Map: React.FC<MapProps> = ({ center }) => {
  const markerRef = useRef<mapboxgl.Marker>(null);

  return (
    <GlMap
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: 0,
        latitude: 0,
        zoom: center ? 4 : 2,
      }}
      zoom={center ? 4 : 2}
      longitude={(center && center[1]) || 0}
      latitude={(center && center[0]) || 0}
      style={{ width: "100%", height: "35vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {center && (
        <Marker
          longitude={center[1]}
          latitude={center[0]}
          color="red"
          ref={markerRef}
        />
      )}
    </GlMap>
  );
};
