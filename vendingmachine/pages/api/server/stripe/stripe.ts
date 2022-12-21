import { NextApiRequest, NextApiResponse } from "next";
import { IMachine } from "../../../../Interface/Machine";
import { connect } from "../../../../Utils/Server/DBConnection";
import { GetMachine } from "../../../../Utils/Server/GetMachine";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const info: {
      machine: number;
      candy: number;
    } = req.body;

    await connect();

    const machine: IMachine = await GetMachine(info.machine);

    if (machine === null) {
      res.status(500).send("No product found");
      return;
    }

    const getPrice = () => {
      var price = machine.slots[info.candy].candy.price;

      return price;
    };

    var description = `Namn: ${machine.slots[info.candy].candy.name}, Pris: ${
      machine.slots[info.candy].candy.price
    } kr`;

    try {
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: "auto",
        phone_number_collection: {
          enabled: true,
        },
        line_items: [
          {
            price_data: {
              currency: "SEK",

              tax_behavior: "inclusive",
              product_data: {
                name: machine.slots[info.candy].candy.name,
                description: description,
              },
              unit_amount: getPrice() * 100,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${req.headers.origin}/confirm?success=true&success_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/confirm?cancel=true`,
        automatic_tax: { enabled: true },
        currency: "SEK",
      });
      res.json({ url: session.url });
    } catch (err: any) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
