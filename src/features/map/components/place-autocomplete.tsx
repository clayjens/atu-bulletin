import { useCallback, useState } from "react";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

import { useDebounce } from "@/hooks/use-debounce";

import useAutocompleteService from "../hooks/use-autocomplete-service";
import { usePlaceAutocomplete } from "../hooks/use-place-autocomplete";

interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void;
}

export default function PlaceAutocomplete({
  onPlaceSelect,
}: PlaceAutocompleteProps) {
  const { autocompleteService, placesService, sessionToken, setSessionToken } =
    useAutocompleteService();

  const { predictionResults, fetchPredictions, handleSuggestionClick } =
    usePlaceAutocomplete(
      autocompleteService,
      placesService,
      sessionToken,
      setSessionToken,
      onPlaceSelect
    );

  const [inputValue, setInputValue] = useState<string>("");

  const debouncedFetchPredictions = useDebounce(fetchPredictions, 300);

  const onInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      debouncedFetchPredictions(value);
    },
    [debouncedFetchPredictions]
  );

  return (
    <Autocomplete
      label="Search for a place"
      placeholder="Start typing to search"
      value={inputValue}
      onInputChange={onInputChange}
      onClear={() => setInputValue("")}
      defaultItems={predictionResults}
      onSelectionChange={(item) => handleSuggestionClick(item!.toString())}
    >
      {(place) => (
        <AutocompleteItem key={place.place_id}>
          {place.description}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
