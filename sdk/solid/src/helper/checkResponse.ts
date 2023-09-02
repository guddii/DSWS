/**
 * Checks if the provided HTTP response has a status of OK, throws error if it is not OK.
 * @param response HTTP response
 * @returns HTTP response if it is OK
 */
export const checkResponse = async (response: Response): Promise<Response> => {
  if (response.ok) {
    return response;
  }

  const responseBody = await response.json();

  throw new Error(responseBody.error || response.statusText);
};
