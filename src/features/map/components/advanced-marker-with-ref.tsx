import {
  AdvancedMarker,
  AdvancedMarkerProps,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

interface AdvancedMarkerWithRefProps {
  onMarkerClick: (marker: google.maps.marker.AdvancedMarkerElement) => void;
}

export default function AdvancedMarkerWithRef({
  onMarkerClick,
  children,
  ...advancedMarkerProps
}: AdvancedMarkerProps & AdvancedMarkerWithRefProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      ref={markerRef}
      onClick={() => {
        if (marker) onMarkerClick(marker);
      }}
      {...advancedMarkerProps}
    >
      {children}
    </AdvancedMarker>
  );
}
