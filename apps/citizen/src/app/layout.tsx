import { SolidApp } from "ui";
import "antd/dist/reset.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Citizen App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SolidApp metadata={metadata}>{children}</SolidApp>
      </body>
    </html>
  );
}
