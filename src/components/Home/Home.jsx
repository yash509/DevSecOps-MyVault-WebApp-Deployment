import { useContext } from "react";
import SelectChain from "../SelectChain/SelectChain";
import { ChainContext } from "../../contexts/ChainContext";
import { Text } from "@radix-ui/themes";
import MnemonicsGenerator from "../MnemonicsGenerator/MnemonicsGenerator";
import { RawMnemonicsContext } from "../../contexts/RawMnemonicsContext";
import MnemonicsDisplay from "../MnemonicsDisplay/MnemonicsDisplay";
import { SavedPhraseContext } from "../../contexts/SavedPhrase";
import SolanaAccount from "../SolanaAccount/SolanaAccount";
import SolanaWallet from "../SolanaWallet/SolanaWallet";
import EthWallet from "../EthWallet/EthWallet";
import EthAccount from "../EthAccount/EthAccount";

const Home = () => {
  const { chainContextState } = useContext(ChainContext);
  const { rawMnemonicsContextState } = useContext(RawMnemonicsContext);
  const { savedPhraseContextState } = useContext(SavedPhraseContext);
  return (
    <>
      {chainContextState ? (
        <>
          {rawMnemonicsContextState ? (
            <>
              {savedPhraseContextState ? (
                <>
                  {chainContextState === "Solana" ? (
                    <SolanaWallet />
                  ) : (
                    <EthWallet />
                  )}
                </>
              ) : (
                <MnemonicsDisplay />
              )}
            </>
          ) : (
            <MnemonicsGenerator />
          )}
        </>
      ) : (
        <SelectChain />
      )}
    </>
  );
};

export default Home;
