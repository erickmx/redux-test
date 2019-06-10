import { BEGIN_API_CALL, API_CALL_ERROR } from "../types/commonTypes";

export const beginApiCall = () => ({
  type: BEGIN_API_CALL
});

export const apiCallError = () => ({
  type: API_CALL_ERROR
});
