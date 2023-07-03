import { Session } from "@inrupt/solid-client-authn-node";

const session = new Session();

export const getTaxOfficeUserSession = async () => {
  if (session.info.isLoggedIn) {
    return session;
  }

  // get your own client id and secret from https://login.inrupt.com/registration.html
  await session.login({
    clientId: "1172f8fb-911d-4a3f-b4fd-2a706201d510",
    clientSecret: "83abc881-667f-43b1-a1b3-91790a96870d",
    oidcIssuer: "https://login.inrupt.com",
    tokenType: "Bearer",
  });

  return session;
};
