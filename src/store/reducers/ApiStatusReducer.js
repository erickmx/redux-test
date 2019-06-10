import { BEGIN_API_CALL, API_CALL_ERROR } from "../types/commonTypes";

// apicallsinProgress
const initialState = 0;

const actionTypeEndsInSucces = type => {
  return type.substring(type.length - 8) === "_SUCCESS";
};

const apiCallStatusReducer = (state = initialState, action) => {
  if (action.type === BEGIN_API_CALL) {
    return state + 1;
  }

  if (action.type === API_CALL_ERROR || actionTypeEndsInSucces(action.type)) {
    return state - 1;
  }

  return state;
};

export default apiCallStatusReducer;
