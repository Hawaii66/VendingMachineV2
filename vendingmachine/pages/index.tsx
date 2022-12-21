import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { GetServerSideProps } from "next/types";
import { ILocation } from "../Interface/Location";
import { API_URL } from "../Utils/API";

const Map = dynamic(() => import("../Components/Map"), { ssr: false });

interface Props {
  locations: {
    machine: number;
    location: ILocation;
  }[];
}

export default function Home({ locations }: Props) {
  return (
    <div>
      <Map locations={locations} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  const res = await fetch(`${API_URL}/api/server/locations`);
  const json = await res.json();

  return {
    props: {
      locations: json.locations,
    },
  };
};
