export enum MapType {
  ROADMAP = "roadmap",
  SATELLITE = "satellite",
  HYBRID = "hybrid",
  TERRAIN = "terrain",
}

export type MapConfig = {
  id: string;
  mapId?: string;
  mapType?: MapType;
  styles?: google.maps.MapTypeStyle[];
};

export type CustomMarker = {
  zIndex: number;
  id: string;
  position: google.maps.LatLngLiteral;
};
