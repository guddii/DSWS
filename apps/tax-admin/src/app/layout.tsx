import { SolidApp } from "ui";
import "antd/dist/reset.css";

export const metadata = {
  title: "Tax Admin App",
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
