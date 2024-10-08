import env from "@/env";
import { MapConfig, MapType } from "@/features/map/types/map";

import darkMapStyles from "./map-styles/dark";

export const MAP_CONFIGS: MapConfig[] = [
  {
    id: "default",
    mapId: env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID,
    mapType: MapType.ROADMAP,
  },
  {
    id: "dark",
    mapType: MapType.ROADMAP,
    styles: darkMapStyles,
  },
];
