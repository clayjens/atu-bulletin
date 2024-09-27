"use client";

import { useCallback, useState } from "react";

import { Map, Marker, useMap } from "@vis.gl/react-google-maps";

import LocationSearch from "./location-search";

export default function LocationMap() {
  const [markerPosition, setMarkerPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const map = useMap();

  const handleSelectLocation = useCallback(
    (lat: number, lng: number) => {
      setMarkerPosition({ lat, lng });

      if (map) {
        map.setCenter({ lat, lng });
        map.setZoom(15);
      }
    },
    [map]
  );

  return (
    <section className="relative mx-auto my-2 flex flex-col items-center justify-center">
      <LocationSearch onSelectLocation={handleSelectLocation} />

      <div className="mt-4 h-96 w-full">
        <Map
          defaultCenter={{ lat: 22.54992, lng: 0 }}
          defaultZoom={3}
          style={{ width: "100%", height: "100%" }}
        >
          {markerPosition && <Marker position={markerPosition} />}
        </Map>
      </div>
    </section>
  );
}
