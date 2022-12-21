import { NextApiRequest, NextApiResponse } from "next";
import { ILocation } from "../../../Interface/Location";
import { connect } from "../../../Utils/Server/DBConnection";
import { GetActiveLocations } from "../../../Utils/Server/GetActiveLocations";
import { GetMachine } from "../../../Utils/Server/GetMachine";

type Data = {
  locations: {
    machine: number;
    location: ILocation;
  }[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connect();

  const locations = await GetActiveLocations();
  res.json({
    locations: locations,
  });
}
