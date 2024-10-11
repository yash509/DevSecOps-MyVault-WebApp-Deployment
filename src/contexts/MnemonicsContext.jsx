import { createContext, useReducer } from "react";

const MnemonicsContext = createContext();
const initialState = [];

const reducer = (state, action) => {
  if (action.type === "setMnemonics") {
    return action.payload;
  }
  return state;
};

const MnemonicsProvider = ({ children }) => {
  const [mnemonicsContextState, mnemonicsContextDispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <MnemonicsContext.Provider
      value={{ mnemonicsContextState, mnemonicsContextDispatch }}
    >
      {children}
    </MnemonicsContext.Provider>
  );
};

export { MnemonicsContext, MnemonicsProvider };
