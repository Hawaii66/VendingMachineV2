import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { ILocation } from "../Interface/Location";
import L from "leaflet";
import Link from "next/link";

interface Props {
  locations: {
    machine: number;
    location: ILocation;
  }[];
}

const MachineIcon = new L.Icon({
  iconUrl: "./VendingMachine.png",
  iconRetinaUrl: "",
  iconSize: new L.Point(75, 75),
  popupAnchor: new L.Point(0, -75 / 2),
});

function Map({ locations }: Props) {
  return (
    <MapContainer
      center={{
        lat: 58.72976014273147,
        lng: 17.01147801625181,
      }}
      zoom={20}
      style={{ height: "50vh", width: "50vw" }}
      tap={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((machine, index) => (
        <Marker
          position={[machine.location.lat, machine.location.lon]}
          icon={MachineIcon}
        >
          <Popup>
            <Link href={`/machine?name=${machine.machine}`}>
              <h1>{machine.location.name}</h1>
            </Link>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
