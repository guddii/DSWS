import { AppProps } from "next/app";
import { SolidApp } from "ui";
import "antd/dist/reset.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SolidApp>
      <Component {...pageProps} />
    </SolidApp>
  );
}
