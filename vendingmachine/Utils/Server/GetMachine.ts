import { IMachine } from "../../Interface/Machine";
import { Location } from "../../Schemas/Location";
import { Machine } from "../../Schemas/Machine";

export const GetMachine = async (id: number) => {
  const machineBase = await Machine.findOne({
    id: id,
  });

  const location = await Location.findOne({
    id: machineBase.location,
  });

  const machine: IMachine = {
    id: id,
    slots: machineBase.slots,
    location: location,
  };

  return machine;
};
