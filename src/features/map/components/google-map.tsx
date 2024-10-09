import { useCallback, useEffect, useState } from "react";

import { Map, Pin } from "@vis.gl/react-google-maps";

import { MAP_CONFIGS } from "@/config/map";
import useSystemTheme from "@/hooks/use-system-theme";

import { CustomMarker, MapConfig } from "../types/map";
import AdvancedMarkerWithRef from "./advanced-marker-with-ref";

interface GoogleMapProps {
  markers: CustomMarker[];
}

export default function GoogleMap({ markers }: GoogleMapProps) {
  const Z_INDEX_SELECTED = markers.length;
  const Z_INDEX_HOVER = markers.length + 1;

  const [mapConfig, setMapConfig] = useState<MapConfig>();
  const { theme } = useSystemTheme();

  const [hoverId, setHoverId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedMarker, setSelectedMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const onMouseEnter = useCallback((id: string | null) => setHoverId(id), []);
  const onMouseLeave = useCallback(() => setHoverId(null), []);
  const onMarkerClick = useCallback(
    (id: string | null, marker?: google.maps.marker.AdvancedMarkerElement) => {
      setSelectedId(id);

      if (marker) setSelectedMarker(marker);

      if (id !== selectedId) {
        setInfoWindowShown(true);
      } else {
        setInfoWindowShown((isShown) => !isShown);
      }
    },
    [selectedId]
  );

  const onMapClick = useCallback(() => {
    setSelectedId(null);
    setSelectedMarker(null);
    setInfoWindowShown(false);
  }, []);

  // const handleInfoWindowCloseClick = useCallback(
  //   () => setInfoWindowShown(false),
  //   []
  // );

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
      disableDefaultUI
      mapId={mapConfig?.mapId}
      mapTypeId={mapConfig?.mapType}
      styles={mapConfig?.styles}
      onClick={onMapClick}
    >
      {markers.map(({ id, zIndex: zIndexDefault, position }) => {
        let zIndex = zIndexDefault;

        if (hoverId === id) zIndex = Z_INDEX_HOVER;
        if (selectedId === id) zIndex = Z_INDEX_SELECTED;

        return (
          <AdvancedMarkerWithRef
            key={id}
            onMarkerClick={(marker: google.maps.marker.AdvancedMarkerElement) =>
              onMarkerClick(id, marker)
            }
            onMouseEnter={() => onMouseEnter(id)}
            onMouseLeave={onMouseLeave}
            zIndex={zIndex}
            style={{
              transform: `scale($${[hoverId, selectedId].includes(id) ? 1.4 : 1})`,
            }}
            position={position}
          >
            <Pin
              background={selectedId === id ? "#22ccff" : null}
              borderColor={selectedId === id ? "#1e89a1" : null}
              glyphColor={selectedId === id ? "#0f677a" : null}
            />
          </AdvancedMarkerWithRef>
        );
      })}
    </Map>
  );
}
