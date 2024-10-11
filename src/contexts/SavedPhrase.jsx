import { createContext, useReducer } from "react";

const SavedPhraseContext = createContext();
const initialState = false;

const reducer = (state, action) => {
  if (action.type === "setIsSavedPhrase") {
    return action.payload;
  }
  return state;
};

const SavedPhraseProvider = ({ children }) => {
  const [savedPhraseContextState, savedPhraseContextDispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <SavedPhraseContext.Provider
      value={{ savedPhraseContextState, savedPhraseContextDispatch }}
    >
      {children}
    </SavedPhraseContext.Provider>
  );
};

export { SavedPhraseContext, SavedPhraseProvider };
