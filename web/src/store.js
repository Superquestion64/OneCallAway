import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import setAuthToken from "./utils/setAuthToken";
import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

// set up a store subscription listener
// to store the users token in localStorage

// initialize current state from redux store for subscription comparison
// preventing undefined error
let currentState = store.getState();

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let prevState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers
  if (prevState.user.token !== currentState.user.token) {
    const token = currentState.user.token;
    setAuthToken(token);
  }
});

export default store;
