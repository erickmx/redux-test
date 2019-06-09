import { LOAD_AUTHORS_SUCCESS } from "../types/authorsTypes";

const initialState = [];

const authorReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
};

export default authorReducer;
