import { createStore, applyMiddleware, compose } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import rooReducer from "./reducers";

const configureStore = initialState => {
  const composeEnhacers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rooReducer,
    initialState,
    composeEnhacers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
};

export default configureStore;
