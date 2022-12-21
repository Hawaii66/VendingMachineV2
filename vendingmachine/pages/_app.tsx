import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="w-screen min-h-screen bg-slate-100">
      <Component {...pageProps} />
    </div>
  );
}
