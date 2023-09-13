import { Session } from "@inrupt/solid-client-authn-node";

const session = new Session();

export const getAgentUserSession = async () => {
  if (session.info.isLoggedIn) {
    return session;
  }

  // get your own client id and secret from https://login.inrupt.com/registration.html
  await session.login({
    clientId: process.env.PARENTAL_BENEFITS_OFFICE_CLIENT_ID,
    clientSecret: process.env.PARENTAL_BENEFITS_OFFICE_CLIENT_SECRET,
    oidcIssuer: "https://login.inrupt.com",
    tokenType: "Bearer",
  });

  return session;
};
