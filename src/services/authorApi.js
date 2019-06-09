import { handleResponses, handleErrors } from "@utils/api";

const BASE_URL = `http://localhost:3001/authors`;

export const getAuthors = () => {
  return fetch(BASE_URL)
    .then(handleResponses)
    .catch(handleErrors);
};
