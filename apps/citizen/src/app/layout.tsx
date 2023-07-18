import { SolidApp, AuthMethods, IAuth } from "ui";
import "antd/dist/reset.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Citizen App",
};

const auth: IAuth = {
  methods: [AuthMethods.Session],
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
