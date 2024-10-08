import { useEffect, useState } from "react";

import { Map } from "@vis.gl/react-google-maps";

import { MAP_CONFIGS } from "@/config/map";
import useSystemTheme from "@/hooks/use-system-theme";

import { MapConfig } from "../types/map";

export default function BasicMap() {
  const [mapConfig, setMapConfig] = useState<MapConfig>();
  const { theme } = useSystemTheme();

  useEffect(() => {
    if (theme === "dark") {
      setMapConfig(MAP_CONFIGS.find((config) => config.id === "dark"));
    } else {
      setMapConfig(MAP_CONFIGS.find((config) => config.id === "default"));
    }
  }, [theme]);

  const ATU = { lat: 35.2939498, lng: -93.136027 };

  return (
    <Map
      defaultZoom={15}
      defaultCenter={ATU}
      gestureHandling="greedy"
      disableDefaultUI={true}
      mapId={mapConfig?.mapId}
      mapTypeId={mapConfig?.mapType}
      styles={mapConfig?.styles}
    />
  );
}
