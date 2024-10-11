import { createContext, useReducer } from "react";

const SolAccountsContext = createContext();
const initialState = [];

const reducer = (state, action) => {
  if (action.type === "setSolAccounts") {
    // const pushState = (state) => [...state, action.payload];
    // const newState = pushState();
    // return newState;
    return [...state, action.payload];
  }
  return state;
};

const SolAccountsContextProvider = ({ children }) => {
  const [solAccountsContextState, solAccountsContextDispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <SolAccountsContext.Provider
      value={{ solAccountsContextState, solAccountsContextDispatch }}
    >
      {children}
    </SolAccountsContext.Provider>
  );
};

export { SolAccountsContext, SolAccountsContextProvider };
