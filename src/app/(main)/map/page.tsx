"use client";

import { useState } from "react";

import BasicMap from "@/features/map/components/basic-map";
import MapHandler from "@/features/map/components/map-handler";
import PlaceAutocomplete from "@/features/map/components/place-autocomplete";

export default function MapPage() {
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);

  return (
    <>
      <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
      <BasicMap />
      <MapHandler place={selectedPlace} />
    </>
  );
}
