import { GetServerSideProps } from "next";
import React from "react";
import Button from "../../Components/Button";
import { IMachine, ISlot } from "../../Interface/Machine";
import { Location } from "../../Schemas/Location";
import { connect } from "../../Utils/Server/DBConnection";
import { GetMachine } from "../../Utils/Server/GetMachine";

interface Props {
  machine: IMachine;
  index: number;
  nostock: boolean;
}

function confirm({ machine, index, nostock }: Props) {
  const submitPayment = async () => {
    const url = `/api/server/stripe/stripe`;
    const data = JSON.stringify({
      machine: machine.id,
      candy: index,
    });
    const result = await fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json",
      },
    });
    window.location.href = (await result.json()).url;
  };

  if (nostock === true) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <div className="w-full md:w-4/5 xl:w-1/3 flex justify-center items-center flex-col gap-5 ">
          <h1 className="text-center font-mono text-orange-500 text-5xl font-extrabold">
            Varan är slut
          </h1>
          <table className="w-4/5 md:w-1/3 xl:w-2/4">
            <tbody className="gap-5 flex flex-col">
              <tr>
                <td className="pr-5">
                  <h2 className="text-left font-mono font-extrabold text-3xl text-neutral-600">
                    Name
                  </h2>
                </td>
                <td className="">
                  <p className="text-left font-mono font-bold text-2xl text-neutral-400">
                    {machine.slots[index].candy.name}
                  </p>
                </td>
              </tr>
              <tr>
                <td className="pr-5">
                  <h2 className="text-left font-mono font-extrabold text-3xl text-neutral-600">
                    Pris
                  </h2>
                </td>
                <td className="">
                  <p className="text-left font-mono font-bold text-2xl text-neutral-400">
                    {machine.slots[index].candy.price} kr
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          <Button link={`/machine?id=${machine.id}`} small>
            Tillbaka
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full md:w-4/5 xl:w-1/3 flex justify-center items-center flex-col gap-5 ">
        <h1 className="text-center font-mono text-orange-500 text-5xl font-extrabold">
          Stämmer detta?
        </h1>
        <table className="w-4/5 md:w-1/3 xl:w-2/4">
          <tbody className="gap-5 flex flex-col">
            <tr>
              <td className="pr-5">
                <h2 className="text-left font-mono font-extrabold text-3xl text-neutral-600">
                  Name
                </h2>
              </td>
              <td className="">
                <p className="text-left font-mono font-bold text-2xl text-neutral-400">
                  {machine.slots[index].candy.name}
                </p>
              </td>
            </tr>
            <tr>
              <td className="pr-5">
                <h2 className="text-left font-mono font-extrabold text-3xl text-neutral-600">
                  Pris
                </h2>
              </td>
              <td className="">
                <p className="text-left font-mono font-bold text-2xl text-neutral-400">
                  {machine.slots[index].candy.price} kr
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <Button onClick={submitPayment}>Genomför Köp</Button>
        <Button link={`/machine?id=${machine.id}`} small>
          Tillbaka
        </Button>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{
  machine: IMachine;
  index: number;
  nostock?: boolean;
}> = async (ctx) => {
  if (ctx.query.success) {
    return {
      redirect: {
        destination: `/completed?id=${ctx.query.success_id}`,
        permanent: true,
      },
    };
  }

  if (ctx.query.cancel) {
    return {
      redirect: {
        destination: "/error",
        permanent: true,
      },
    };
  }

  if (
    ctx.query.machine === undefined ||
    ctx.query.machine.toString() !== ctx.query.machine
  ) {
    return {
      notFound: true,
    };
  }
  if (
    ctx.query.candy === undefined ||
    ctx.query.candy.toString() !== ctx.query.candy
  ) {
    return {
      notFound: true,
    };
  }
  await connect();
  var machine = await GetMachine(parseInt(ctx.query.machine));

  var slots: ISlot[] = machine.slots.map((slot) => {
    return {
      candy: {
        description: slot.candy.description,
        image: slot.candy.image,
        name: slot.candy.name,
        price: slot.candy.price,
      },
      index: slot.index,
      stock: slot.stock,
    };
  });

  machine.slots = slots;
  machine.location = {
    lat: 0,
    lon: 0,
    name: "",
  };

  if (slots[parseInt(ctx.query.candy)].stock < 1) {
    return {
      props: {
        nostock: true,
        index: parseInt(ctx.query.candy),
        machine: machine,
      },
    };
  }

  return {
    props: {
      index: parseInt(ctx.query.candy),
      machine: machine,
    },
  };
};

export default confirm;
