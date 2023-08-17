import { SolidApp, AuthMethods, IAuth, IUserMenu } from "ui";
import { Metadata } from "next";
import { navigation } from "./navigation";

export const metadata: Metadata = {
  title: "Citizen",
};

const auth: IAuth = {
  methods: [AuthMethods.Session],
};

const userMenu: IUserMenu = {
  hasInbox: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SolidApp
          metadata={metadata}
          auth={auth}
          userMenu={userMenu}
          navigation={navigation}
        >
          {children}
        </SolidApp>
      </body>
    </html>
  );
}
