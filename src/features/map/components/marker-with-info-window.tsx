import { useState } from "react";

import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";

interface MarkerWithInfowindowProps {
  title: string;
  position: google.maps.LatLng | google.maps.LatLngLiteral | null | undefined;
  children: React.ReactNode;
}

export const MarkerWithInfowindow = ({
  title,
  position,
  children,
}: MarkerWithInfowindowProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setIsOpen(true)}
        position={position}
        title={title}
      />
      {isOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setIsOpen(false)}
        >
          {children}
        </InfoWindow>
      )}
    </>
  );
};
