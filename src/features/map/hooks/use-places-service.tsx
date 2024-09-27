import { useEffect, useState } from "react";

import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

type PlacesService = google.maps.places.PlacesService | undefined;

export default function usePlacesService() {
  const map = useMap();
  const placesLibrary = useMapsLibrary("places");
  const [placesService, setPlacesService] = useState<PlacesService>();

  useEffect(() => {
    if (!placesLibrary || !map) return;

    const service = new placesLibrary.PlacesService(map);

    setPlacesService(service);
  }, [placesLibrary, map]);

  return placesService;
}
