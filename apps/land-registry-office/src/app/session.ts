import { Session } from "@inrupt/solid-client-authn-node";

const session = new Session();

export const getAgentUserSession = async () => {
  if (session.info.isLoggedIn) {
    return session;
  }

  // get your own client id and secret from https://login.inrupt.com/registration.html
  await session.login({
    clientId: "5667120c-ece3-4261-ba75-8c31c22e15d4",
    clientSecret: "fe6e0c90-9a08-406f-a632-b243cd312512",
    oidcIssuer: "https://login.inrupt.com",
    tokenType: "Bearer",
  });

  return session;
};
