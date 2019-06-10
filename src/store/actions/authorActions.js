import * as authorApi from "@services/authorApi";
import { LOAD_AUTHORS_SUCCESS } from "../types/authorsTypes";
import { beginApiCall, apiCallError } from "./apiStatusActions";

const loadAuthorsSuccess = authors => ({
  type: LOAD_AUTHORS_SUCCESS,
  authors
});

// thunks

export const loadAuthors = () => dispatch => {
  dispatch(beginApiCall());
  return authorApi
    .getAuthors()
    .then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    })
    .catch(err => {
      dispatch(apiCallError());
      throw err;
    });
};
