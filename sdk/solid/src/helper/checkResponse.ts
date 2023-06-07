/**
 * Checks if the provided HTTP response has a status of OK, throws error if it is not OK.
 * @param response HTTP response
 * @returns HTTP response if it is OK
 */
export const checkResponse = (response: Response): Response => {
  if (response.ok) {
    return response;
  }

  throw new Error(response.statusText);
};
