"use client";

import { useMemo, useState } from "react";

import { Autocomplete, AutocompleteItem, Button } from "@nextui-org/react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import Loading from "@/app/loading";
import env from "@/env";

export default function Places() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    mapIds: [env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID],
    libraries: ["places"],
  });

  if (!isLoaded) return <Loading />;
  return <Map />;
}

type GeoLocation = { lat: number; lng: number };

function Map() {
  const center = useMemo(() => ({ lat: 35.292439, lng: -93.1333896 }), []);
  const [selected, setSelected] = useState<GeoLocation | null>(null);

  return (
    <div className="flex flex-col">
      <section className="flex items-center gap-4">
        <PlacesAutocomplete setSelected={setSelected} />
        <Button
          size="lg"
          className="rounded-md"
          color="primary"
          isDisabled={!selected}
        >
          Use Location
        </Button>
      </section>

      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="w-[75%] h-[75%]"
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
    </div>
  );
}

interface PlacesAutocompleteProps {
  setSelected: (location: GeoLocation) => void;
}

function PlacesAutocomplete({ setSelected }: PlacesAutocompleteProps) {
  const {
    ready,
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = getLatLng(results[0]);
    setSelected({ lat, lng });
  };

  return (
    <>
      <Autocomplete
        allowsCustomValue
        size="sm"
        label="Search an address"
        value={value}
        onInputChange={(e) => setValue(e)}
        disabled={!ready}
        isLoading={!ready}
        defaultItems={data.map((item) => ({
          key: item.place_id,
          description: item.description,
        }))}
        onSelectionChange={(key) => {
          const selectedItem = data.find((item) => item.place_id === key);
          if (selectedItem) handleSelect(selectedItem.description);
        }}
      >
        {(item) => (
          <AutocompleteItem key={item.key}>{item.description}</AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
}
