import { GetServerSideProps } from "next";
import React from "react";
import { IMachine } from "../../Interface/Machine";
import { API_URL } from "../../Utils/API";

interface Props {
  machine: IMachine;
}

function Machine({ machine }: Props) {
  return (
    <div>
      <h1>{machine.location.name}</h1>
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
