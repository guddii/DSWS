import {
  SolidApp,
  AuthMethods,
  IAuth,
  IUserMenu,
  ILayoutOptions,
  IMetadataOptions,
} from "ui";
import { generateNavigation } from "./navigation";
import { getStaticParams, getMetadata, I18nKey } from "i18n/server";

const auth: IAuth = {
  methods: [AuthMethods.Session],
};

const userMenu: IUserMenu = {
  hasInbox: true,
};

export const generateStaticParams = getStaticParams();

export const generateMetadata = async ({ params }: IMetadataOptions) => {
  const key: I18nKey = "apps.citizen.app.root.title";
  return getMetadata({ params, key });
};

export default async function RootLayout({ children, params }: ILayoutOptions) {
  const metadata = await generateMetadata({ params });
  const navigation = await generateNavigation({ params });

  return (
    <html lang={params.locale}>
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
