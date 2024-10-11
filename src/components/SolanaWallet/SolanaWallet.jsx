import bs58 from "bs58";
import { useContext, useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import { RawMnemonicsContext } from "../../contexts/RawMnemonicsContext";
import { Box, Button, Card, Text } from "@radix-ui/themes";
import AccountCard from "../AccountCard/AccountCard";
import { SelectedSolAccountContext } from "../../contexts/SelectedSolAccountContext";
import { SolAccountsContext } from "../../contexts/SolAccountsContext";

export function SolanaWallet() {
  // const connection = new Connection("https://api.devnet.solana.com");
  const connection = new Connection(
    "https://solana-devnet.g.alchemy.com/v2/CNAtFpCtGfjzf138vPcHDgRt9WFIj68s"
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [allAccounts, setAllAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const { rawMnemonicsContextState } = useContext(RawMnemonicsContext);
  const { selectedSolAccountContextState, selectedSolAccountContextDispatch } =
    useContext(SelectedSolAccountContext);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { solAccountsContextState, solAccountsContextDispatch } =
    useContext(SolAccountsContext);

  const addSolWallet = async () => {
    const seed = await mnemonicToSeed(rawMnemonicsContextState);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secret);
    setCurrentIndex(currentIndex + 1);
    const newAccount = {
      accountNumber: currentIndex + 1,
      publicKey: keypair.publicKey.toBase58(),
      privateKey: bs58.encode(keypair.secretKey),
    };
    // console.log(newAccount);
    setAllAccounts([...allAccounts, newAccount]);
    // solAccountsContextDispatch({
    //   type: "setSolAccounts",
    //   payload: newAccount,
    // });
    selectedSolAccountContextDispatch({
      type: "setSelectedSolAccount",
      payload: newAccount,
    });
  };

  useEffect(() => {
    addSolWallet();
  }, []);

  useEffect(() => {
    console.log("This is your accounts array", allAccounts);
  }, [allAccounts]);

  const addSolWalletHandler = () => {
    addSolWallet();
  };

  return (
    <Box className="flex">
      <Box className="flex flex-col justify-end min-h-screen w-1/6">
        <ul>
          {allAccounts?.map((account) => (
            <li
              className="hover:text-rose-600 hover:cursor-pointer text-center"
              onClick={() => {
                selectedSolAccountContextDispatch({
                  type: "setSelectedSolAccount",
                  payload: account,
                });
              }}
              key={account.accountNumber}
            >
              Account {account.accountNumber}
            </li>
          ))}
        </ul>
        <Button className="w-full" onClick={addSolWalletHandler}>
          Add Wallet
        </Button>
      </Box>
      <Box className="flex flex-grow justify-center items-center">
        {/* <Card>
          {publicKeys.map((p) => (
            <div>{p.toBase58()}</div>
          ))}
        </Card> */}
        <AccountCard />
      </Box>
    </Box>
  );
}

export default SolanaWallet;
