import { Session } from "@inrupt/solid-client-authn-node";

const session = new Session();

export const getAgentUserSession = async () => {
  if (session.info.isLoggedIn) {
    return session;
  }
  const clientId = process.env.TAX_OFFICE_CLIENT_ID;
  if (!clientId) {
    throw new Error("LAND_REGISTRY_OFFICE_CLIENT_ID is undefined");
  }

  const clientSecret = process.env.TAX_OFFICE_CLIENT_SECRET;
  if (!clientSecret) {
    throw new Error("LAND_REGISTRY_OFFICE_CLIENT_ID is undefined");
  }

  // get your own client id and secret from https://login.inrupt.com/registration.html
  await session
    .login({
      clientId,
      clientSecret,
      oidcIssuer: "https://login.inrupt.com",
      tokenType: "Bearer",
    })
    .then(() => {
      if (!session.info.isLoggedIn) {
        throw new Error("agent login failed");
      }
    });

  return session;
};
