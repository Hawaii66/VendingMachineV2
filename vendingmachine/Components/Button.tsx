import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  small?: boolean;
  onClick?: () => void;
  link?: string;
}

function Button({ children, small, onClick, link }: Props) {
  if (link !== undefined) {
    return (
      <Link
        href={link}
        className={`mx-auto ${
          small ? "w-2/5" : "w-3/5"
        } text-center font-mono text-slate-100 font-bold text-2xl ${
          small ? "bg-slate-300" : "bg-green-500"
        } rounded-2xl py-2`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={() => {
        if (onClick === undefined) {
          alert("On click not defined");
          return;
        }

        onClick();
      }}
      className={`mx-auto ${
        small ? "w-2/5" : "w-4/5 md:w-3/5"
      } text-center font-mono text-slate-100 font-bold text-2xl ${
        small ? "bg-slate-300" : "bg-green-500"
      } rounded-2xl py-2`}
    >
      {children}
    </button>
  );
}

export default Button;
