import { APIProvider as GoogleMapsAPIProvider } from "@vis.gl/react-google-maps";

import env from "@/env";

interface CustomMapProviderProps {
  children: React.ReactNode;
}

export default function CustomMapProvider({
  children,
}: CustomMapProviderProps) {
  return (
    <GoogleMapsAPIProvider apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      {children}
    </GoogleMapsAPIProvider>
  );
}
