"use client";

import { useCallback, useEffect, useState } from "react";

import GoogleMap from "@/features/map/components/google-map";
import MapHandler from "@/features/map/components/map-handler";
import PlaceAutocomplete from "@/features/map/components/place-autocomplete";
import { CustomMarker } from "@/features/map/types/map";

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] =
    useState<google.maps.places.PlaceResult | null>(null);
  const [markers, setMarkers] = useState<CustomMarker[]>([]);

  const handlePlaceSelect = useCallback(
    (place: google.maps.places.PlaceResult | null) => {
      if (place?.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const position = { lat, lng };

        setSelectedLocation(place);
        setMarkers((prevMarkers) => [
          ...prevMarkers,
          {
            position,
            id: place.place_id!,
            zIndex: position.lat,
          },
        ]);
      }
    },
    []
  );

  useEffect(() => {
    // A common pattern for applying z-indexes is to sort the markers
    // by latitude and apply a default z-index according to the index position
    // This usually is the most pleasing visually. Markers that are more "south"
    // thus appear in front.
    const sortedMarkers = markers
      .sort((a, b) => b.position.lat - a.position.lat)
      .map((marker, idx) => ({ ...marker, zIndex: idx }));

    setMarkers(sortedMarkers);
  }, [setMarkers, markers]);

  return (
    <>
      <PlaceAutocomplete onPlaceSelect={handlePlaceSelect} />
      <GoogleMap markers={markers} />
      <MapHandler location={selectedLocation} />
    </>
  );
}
