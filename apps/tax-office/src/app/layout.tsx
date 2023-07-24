import { AuthMethods, IAgent, IAuth, SolidApp } from "ui";
import "antd/dist/reset.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tax Office App",
};

const auth: IAuth = {
  methods: [AuthMethods.WebId],
};

const agent: IAgent = {
  webId: "https://id.inrupt.com/taxofficeapp",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SolidApp metadata={metadata} auth={auth} agent={agent}>
          {children}
        </SolidApp>
      </body>
    </html>
  );
}
