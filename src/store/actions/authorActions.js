import * as authorApi from "@services/authorApi";
import { LOAD_AUTHORS_SUCCESS } from "../types/authorsTypes";

const loadAuthorsSuccess = authors => ({
  type: LOAD_AUTHORS_SUCCESS,
  authors
});

// thunks

export const loadAuthors = () => dispatch => {
  return authorApi
    .getAuthors()
    .then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    })
    .catch(err => {
      throw err;
    });
};
