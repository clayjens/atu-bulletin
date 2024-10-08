import { useCallback, useState } from "react";

/**
 * Manages the fetching of the autocomplete predictions and the handling of place details.
 * @param autocompleteService An `AutocompleteService` instance.
 * @param placesService An `PlacesService` instance.
 * @param sessionToken  An `AutocompleteSessionToken` instance.
 * @param setSessionToken A function to set the `AutocompleteSessionToken`.
 * @param onPlaceSelect A callback function to handle the selected place.
 * @returns An object containing the prediction results, a function to fetch predictions, and a function to handle the suggestion click.
 */
export function usePlaceAutocomplete(
  autocompleteService: google.maps.places.AutocompleteService | null,
  placesService: google.maps.places.PlacesService | null,
  sessionToken: google.maps.places.AutocompleteSessionToken | undefined,
  setSessionToken: React.Dispatch<
    React.SetStateAction<
      google.maps.places.AutocompleteSessionToken | undefined
    >
  >,
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void
) {
  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);

  const fetchPredictions = useCallback(
    async (inputValue: string) => {
      if (!autocompleteService || !inputValue) {
        setPredictionResults([]);
        return;
      }

      const request = { input: inputValue, sessionToken };
      const response = await autocompleteService.getPlacePredictions(request);

      setPredictionResults(response.predictions);
    },
    [autocompleteService, sessionToken]
  );

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!placesService) return;

      const detailRequestOptions = {
        placeId,
        fields: ["geometry", "name", "formatted_address"],
        sessionToken,
      };

      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null
      ) => {
        onPlaceSelect(placeDetails);
        setPredictionResults([]);
        setSessionToken(new google.maps.places.AutocompleteSessionToken());
      };

      placesService.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [onPlaceSelect, placesService, sessionToken, setSessionToken]
  );

  return { predictionResults, fetchPredictions, handleSuggestionClick };
}
