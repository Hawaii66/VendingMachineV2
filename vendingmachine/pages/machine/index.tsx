import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { IMachine } from "../../Interface/Machine";
import { API_URL } from "../../Utils/API";

interface Props {
  machine: IMachine;
}

function Machine({ machine }: Props) {
  return (
    <div className="w-4/5 mx-auto flex flex-col justify-center items-center">
      <h1 className="text-orange-500 font-bold font-mono text-5xl">
        {machine.location.name}
      </h1>
      <p className="text-green-600 font-semibold font-mono text-xl">
        Lat: {machine.location.lat.toPrecision(5)} Lon:{" "}
        {machine.location.lon.toPrecision(5)}
      </p>
      <p className="text-slate-600 font-light font-mono text-sm">
        Id: {machine.id}
      </p>
      <div className="rounded-lg m-5 grid grid-cols:1 lg:grid-cols-2 2xl:grid-cols-3 gap-10">
        {[
          ...machine.slots,
          ...machine.slots,
          ...machine.slots,
          ...machine.slots,
          ...machine.slots,
        ].map((slot, index) => {
          return (
            <div
              className="shadow-2xl rounded-2xl bg-slate-100 p-5 flex justify-center flex-col gap-2"
              key={index}
            >
              <h1 className="w-full text-center font-mono text-orange-500 font-bold text-2xl">
                {slot.candy.name}
              </h1>
              <div className="w-full flex flex-row justify-between items-center p-5">
                <h3 className="text-left font-mono text-green-600 font-semibold text-xl">
                  {slot.candy.price} kr
                </h3>
                <h3
                  className={`text-right font-mono ${
                    slot.stock < 3 ? "text-red-600" : "text-green-600"
                  } font-semibold text-xl`}
                >
                  {slot.stock} st kvar
                </h3>
              </div>{" "}
              <img className="mx-auto" src={slot.candy.image} />
              <Link
                href={`/confirm?machine=${machine.id}&candy=${slot.index}`}
                className="mx-auto w-3/5 text-center font-mono text-slate-100 font-bold text-2xl bg-green-500 rounded-2xl py-2"
              >
                Köp {slot.candy.price} kr
              </Link>
              <p className=" text-slate-600 font-mono text-base">
                {slot.candy.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<any> = async (ctx) => {
  if (ctx.query.id === undefined || ctx.query.id.toString() !== ctx.query.id) {
    return {
      redirect: {
        destination: "/machine?id=0",
        permanent: true,
      },
    };
  }

  const res = await fetch(`${API_URL}/api/server/machine?id=${ctx.query.id}`);
  const json = await res.json();

  return {
    props: {
      machine: json.machine,
    },
  };
};
export default Machine;
