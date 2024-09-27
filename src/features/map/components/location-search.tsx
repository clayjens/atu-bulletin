"use client";

import { Autocomplete } from "@nextui-org/react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

interface LocationSearchProps {
  onSelectLocation: (lat: number, lng: number) => void;
}

export default function LocationSearch({
  onSelectLocation,
}: LocationSearchProps) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    requestOptions: {
      // TODO: restrict search areas with location/radius
    },
    debounce: 300,
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = getLatLng(results[0]);

      onSelectLocation(lat, lng);
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  return (
    <Autocomplete
      label="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      disabled={!ready}
      className="w-full"
      options={
        status === "OK"
          ? data.map(({ place_id, description }) => ({
              key: place_id,
              label: description,
            }))
          : []
      }
      onSelect={(value) => handleSelect(value)}
    />
  );
}
