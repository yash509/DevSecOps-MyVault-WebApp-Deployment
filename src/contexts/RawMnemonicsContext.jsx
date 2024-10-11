import { createContext, useReducer } from "react";

const RawMnemonicsContext = createContext();
const initialState = "";

const reducer = (state, action) => {
  if (action.type === "setRawMnemonics") {
    return action.payload;
  }
  return state;
};

const RawMnemonicsProvider = ({ children }) => {
  const [rawMnemonicsContextState, rawMnemonicsContextDispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <RawMnemonicsContext.Provider
      value={{ rawMnemonicsContextState, rawMnemonicsContextDispatch }}
    >
      {children}
    </RawMnemonicsContext.Provider>
  );
};

export { RawMnemonicsContext, RawMnemonicsProvider };
