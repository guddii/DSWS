import {
  AuthMethods,
  IAgent,
  IAuth,
  ILayoutOptions,
  IMetadataOptions,
  SolidApp,
} from "ui";
import { generateNavigation } from "./navigation";
import { getStaticParams, getMetadata, I18nKey } from "i18n/server";

const auth: IAuth = {
  methods: [AuthMethods.WebId],
};

const agent: IAgent = {
  webId: process.env.NEXT_PUBLIC_EMPLOYMENT_AGENCY_WEB_ID,
};

export const generateStaticParams = getStaticParams();

export const generateMetadata = async ({ params }: IMetadataOptions) => {
  const key: I18nKey = "apps.employmentAgency.app.root.title";
  return getMetadata({ params, key });
};

export default async function RootLayout({ children, params }: ILayoutOptions) {
  const metadata = await generateMetadata({ params });
  const navigation = await generateNavigation({ params });
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
