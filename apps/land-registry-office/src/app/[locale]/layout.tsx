import { AuthMethods, IAgent, IAuth, SolidApp } from "ui";
import { Metadata } from "next";
import { navigation } from "./navigation";

export const metadata: Metadata = {
  title: "Land Registry Office",
};

const auth: IAuth = {
  methods: [AuthMethods.WebId],
};

const agent: IAgent = {
  webId: "https://id.inrupt.com/landregistryofficeapp",
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
          agent={agent}
          navigation={navigation}
        >
          {children}
        </SolidApp>
      </body>
    </html>
  );
}
