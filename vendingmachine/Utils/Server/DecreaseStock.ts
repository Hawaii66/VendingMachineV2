import { Machine } from "../../Schemas/Machine";
import { connect } from "./DBConnection";
import { GetMachine } from "./GetMachine";

export const DecreaseStock = async (id: number, index: number) => {
  await connect();

  var machine = await GetMachine(id);

  machine.slots[index].stock -= 1;

  await Machine.findOneAndUpdate(
    {
      id: id,
    },
    {
      slots: machine.slots,
    }
  );
};
