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
