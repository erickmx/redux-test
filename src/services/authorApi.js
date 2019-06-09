import { handleResponses, handleErrors } from "../utils/api";

const BASE_URL = `${process.env.API_URL}/authors`;

export const getAuthors = () => {
  return fetch(BASE_URL)
    .then(handleResponses)
    .catch(handleErrors);
};
