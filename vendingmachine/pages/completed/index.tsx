import Link from "next/link";
import { GetServerSideProps } from "next/types";
import React from "react";
import Button from "../../Components/Button";

interface Props {
  price: number;
  id: string;
  customer: {
    name: string;
    email: string;
  };
  status: string;
}

function Completed({ customer, id, price, status }: Props) {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-11/12 md:w-5/6 lg:w-3/5 flex items-center flex-col gap-10 mt-16">
        <div>
          <h1 className="text-orange-500 text-center font-mono text-4xl font-bold">
            Ditt köp är genomfört
          </h1>
          <h3 className="text-green-600 text-center font-mono text-2xl font-bold">
            Varan kommer ut ur maskinen om några sekunder
          </h3>
        </div>
        <div>
          <h1 className="mb-2 font-mono font-bold text-2xl text-slate-600">
            Id:
          </h1>
          <div className="flex flex-row">
            <p className="text-slate-500 font-semibold font-mono break-all">
              {id}
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row items-center lg:items-start justify-evenly">
          <div>
            <h1 className="mb-2 font-mono font-bold text-2xl text-slate-600">
              Pris
            </h1>
            <p className="text-slate-500 font-semibold font-mono">{price} kr</p>
            <br />
            <br />
            <br className="mb-10" />
            <h1 className="mb-2 font-mono font-bold text-2xl text-slate-600">
              Tack
            </h1>
            <p className="text-slate-500 font-semibold font-mono"></p>
          </div>
          <div>
            <h1 className="mb-2 font-mono font-bold text-2xl text-slate-600">
              Person
            </h1>
            <p className="text-slate-500 font-semibold font-mono">
              {customer.email}
            </p>
            <p className="text-slate-500 font-semibold font-mono">
              {customer.name}
            </p>
            <br />
            <br className="mb-10" />
            <h1 className="mb-2 font-mono font-bold text-2xl text-slate-600">
              Status
            </h1>
            <p className="text-slate-500 font-semibold font-mono">
              {status.toUpperCase()}
            </p>
          </div>
        </div>
        <Button link="/" small>
          Tillbaka
        </Button>{" "}
        <p className="text-slate-500 font-semibold font-mono">
          Kontakt:{" "}
          <Link href={"mailto:hawaiidev@outlook.com"}>
            hawaiidev@outlook.com
          </Link>
        </p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.retrieve(ctx.query.id);

  return {
    props: {
      customer: {
        email: session.customer_details.email,
        name: session.customer_details.name,
      },
      id: session.id,
      price: session.amount_total / 100,
      status: session.status,
    },
  };
};

export default Completed;
