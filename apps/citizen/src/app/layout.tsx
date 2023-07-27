import { SolidApp, AuthMethods, IAuth, INavigation } from "ui";
import "antd/dist/reset.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Citizen App",
};

const auth: IAuth = {
  methods: [AuthMethods.Session],
};

const navigation: INavigation = {
  routes: [
    {
      key: "/",
      label: "Stammdaten",
    },
    {
      key: "/inbox",
      label: "Inbox",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SolidApp metadata={metadata} auth={auth} navigation={navigation}>
          {children}
        </SolidApp>
      </body>
    </html>
  );
}
