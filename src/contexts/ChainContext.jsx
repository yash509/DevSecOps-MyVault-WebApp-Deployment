import { createContext, useReducer } from "react";

const ChainContext = createContext();
const initialState = null;

const reducer = (state, action) => {
  if (action.type === "selectedChain") {
    return action.payload;
  }
  return state;
};

const ChainProvider = ({ children }) => {
  const [chainContextState, chainContextDispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <ChainContext.Provider value={{ chainContextState, chainContextDispatch }}>
      {children}
    </ChainContext.Provider>
  );
};

export { ChainContext, ChainProvider };
