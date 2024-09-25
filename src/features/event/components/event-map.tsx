"use client";

import { useState } from "react";

import { Button } from "@nextui-org/react";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import { createLocation } from "../actions";

function LocationMarker({ setLatLng }) {
  useMapEvents({
    click(e) {
      setLatLng(e.latlng);
    },
  });

  return null;
}

export default function EventMap({ setLocationId }) {
  const [latLng, setLatLng] = useState(null);

  const handleLocationSubmit = async () => {
    if (!latLng) return;

    const locationId = await createLocation(latLng.lat, latLng.lng);

    setLocationId(locationId);
  };

  return (
    <div>
      <MapContainer
        center={[35.2937888, -93.1387221]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {latLng && <Marker position={latLng} />}
        <LocationMarker setLatLng={setLatLng} />
      </MapContainer>

      {latLng && (
        <div>
          <p>
            Latitude: {latLng.lat}, Longitude: {latLng.lng}
          </p>
          <Button onClick={handleLocationSubmit}>Confirm Location</Button>
        </div>
      )}
    </div>
  );
}
