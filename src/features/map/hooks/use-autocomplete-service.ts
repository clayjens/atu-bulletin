import { useEffect, useState } from "react";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

/**
 * Handles the setup of the `AutocompleteService`, `PlacesService`, and session tokens.
 * @returns An object containing the autocomplete service, places service, and session token.
 */
export default function useAutocompleteService() {
  const map = useMap();
  const places = useMapsLibrary("places");

  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());

    return () => setAutocompleteService(null);
  }, [map, places]);

  return { autocompleteService, placesService, sessionToken, setSessionToken };
}
