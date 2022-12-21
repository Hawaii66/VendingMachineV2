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
    <div className="w-4/5 aspect-[3/5] md:aspect-[3/2]">
      <MapContainer
        center={{
          lat: 58.72976014273147,
          lng: 17.01147801625181,
        }}
        zoom={20}
        style={{
          width: "100%",
          height: "100%",
        }}
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
                <h1 className="text-3xl">{machine.location.name}</h1>
              </Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
