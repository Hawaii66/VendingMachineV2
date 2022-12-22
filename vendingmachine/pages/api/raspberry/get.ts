import { NextApiRequest, NextApiResponse } from "next";
import { Raspberry } from "../../../Schemas/Raspberry";
import { connect } from "../../../Utils/Server/DBConnection";

type Data = {
  spin: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  const raspberryID = req.query["id"];
  if (raspberryID !== process.env.RASP_ID) {
    return res.status(400).send("Wrong raspberry id");
  }

  await connect();

  const machineID = req.query["machine"];

  const orderObject = await Raspberry.findOne({
    machine: parseInt(machineID?.toString() || "0"),
  });

  if (orderObject === null) {
    return res.status(202).send("No candy ready");
  }

  const order = {
    candy: orderObject.candy,
    machine: orderObject.machine,
  };

  await Raspberry.findOneAndDelete({
    machine: parseInt(machineID?.toString() || "0"),
    candy: order.candy,
  });

  console.log("Removing one");

  res.status(200).json({
    spin: order.candy,
  });
}
