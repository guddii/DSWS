import { AuthMethods, IAuth, SolidApp } from "ui";
import "antd/dist/reset.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Office App",
};

const auth: IAuth = {
  methods: [AuthMethods.WebId],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SolidApp metadata={metadata} auth={auth}>
          {children}
        </SolidApp>
      </body>
    </html>
  );
}
