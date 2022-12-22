import { request } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import { Raspberry } from "../../../../Schemas/Raspberry";
import { connect } from "../../../../Utils/Server/DBConnection";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2022-11-15",
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  if (method !== "POST") {
    res.status(404).end();
    return;
  }

  const sig = req.headers["stripe-signature"];
  const reqBuffer = await buffer(req);

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      reqBuffer,
      sig?.toString() || "",
      webhookSecret?.toString() || ""
    );
  } catch (err: any) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log("Recived event", event);

  const t: any = event;
  const url = t.data.object.success_url;
  console.log(url);

  const test = new URLSearchParams(url);

  await connect();

  const machineID = test.get("machine") || "-1";
  const candyID = test.get("candy") || "-1";
  if (machineID === "-1") {
    console.log("No machine id", url);
    return;
  } else if (candyID === "-1") {
    console.log("No candy id", url);
    return;
  }
  console.log(machineID, candyID);

  await Raspberry.insertMany([
    {
      machine: parseInt(machineID.toString()),
      candy: parseInt(candyID.toString()),
    },
  ]);

  res.status(200).end();
}
