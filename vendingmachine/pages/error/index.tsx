import React from "react";
import Button from "../../Components/Button";

function Error() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="m-10 flex w-full h-1/3 flex-col items-center justify-evenly pt-">
        <h1 className="text-center font-mono text-orange-500 text-2xl sm:text-5xl lg:text-7xl font-bold mt-10">
          Något gick fel med köpet
        </h1>
        <p className="text-center font-mono text-green-600  sm:text-xl lg:text-3xl font-semibold mt-5">
          Försök igen nedan
        </p>
        <p className="text-slate-500 font-semibold font-mono w-11/12 sm:w-4/5 lg:w-1/2 xl:w-1/3 mt-10">
          Vi beklagar att du inte kunde göra köpet/betalningen. Om du
          fortfarande är intresserad av föremålet, vänligen kontakta oss så
          hjälper vi dig att göra köpet på ett annat sätt.
        </p>
        <p className="text-slate-500 font-semibold font-mono w-11/12 sm:w-4/5 lg:w-1/2 xl:w-1/3 mt-10">
          Om du har några frågor eller problem med betalningen, vänligen
          kontakta oss så hjälper vi dig att lösa det.
        </p>
        <p className="text-slate-500 font-semibold font-mono w-11/12 sm:w-4/5 lg:w-1/2 xl:w-1/3 mb-2 mt-10">
          Tack för att du handlar hos oss!
        </p>
        <p className="text-slate-500 font-semibold font-mono w-11/12 sm:w-4/5 lg:w-1/2 xl:w-1/3 my-2">
          Med vänliga hälsningar,
        </p>
        <p className="text-slate-500 font-semibold font-mono w-11/12 sm:w-4/5 lg:w-1/2 xl:w-1/3 mt-2 mb-10">
          HawaiiDev Snacks
        </p>
        <div className="w-5/6 flex justify-center items-center sm:w-2/3 lg:1/3">
          <Button link="/">Försök Igen</Button>
        </div>
        <p className="text-center font-mono text-slate-800 font-bold m-5">
          Error med köp
        </p>
      </div>
    </div>
  );
}

export default Error;
