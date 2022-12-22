import { ILocation } from "../../Interface/Location";
import { Location } from "../../Schemas/Location";
import { Machine } from "../../Schemas/Machine";

export const GetActiveLocations = async () => {
  const machines = await Machine.find();

  var locations: {
    machine: number;
    location: ILocation;
  }[] = [];

  for (var i = 0; i < machines.length; i++) {
    const location = await Location.findOne({
      name: machines[i].location,
    });

    locations.push({
      machine: machines[i].id,
      location: location,
    });
  }

  return locations;
};
