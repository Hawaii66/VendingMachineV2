import { NextApiRequest, NextApiResponse } from "next";
import { IMachine, ISlot } from "../../../Interface/Machine";
import { Location } from "../../../Schemas/Location";
import { Machine } from "../../../Schemas/Machine";
import { connect } from "../../../Utils/Server/DBConnection";
import { GetMachine } from "../../../Utils/Server/GetMachine";
import { VerifyQuery } from "../../../Utils/Middleware/VerifyId";

type Data = {
  products: ISlot[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | string>
) {
  const id = VerifyQuery(req.query.id);
  if (id === "") {
    res.status(400).send("Wrong id");
    return;
  }
  await connect();

  const machine = await GetMachine(parseInt(id));
  res.json({
    machine: machine,
  });
}
