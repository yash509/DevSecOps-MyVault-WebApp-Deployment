import { createContext, useReducer } from "react";

const SelectedSolAccountContext = createContext();
const initialState = null;

const reducer = (state, action) => {
  if (action.type === "setSelectedSolAccount") {
    return action.payload;
  }
  return state;
};

const SelectedSolAccountContextProvider = ({ children }) => {
  const [selectedSolAccountContextState, selectedSolAccountContextDispatch] =
    useReducer(reducer, initialState);

  return (
    <SelectedSolAccountContext.Provider
      value={{
        selectedSolAccountContextState,
        selectedSolAccountContextDispatch,
      }}
    >
      {children}
    </SelectedSolAccountContext.Provider>
  );
};

export { SelectedSolAccountContext, SelectedSolAccountContextProvider };
