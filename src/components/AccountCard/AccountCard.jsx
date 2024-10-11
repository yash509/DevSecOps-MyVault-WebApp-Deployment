import bs58 from "bs58";
import { CopyIcon, EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import {
  Badge,
  Box,
  Button,
  Card,
  Code,
  DataList,
  Flex,
  Heading,
  IconButton,
  Tabs,
  Text,
  TextField,
} from "@radix-ui/themes";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SelectedSolAccountContext } from "../../contexts/SelectedSolAccountContext";

const AccountCard = () => {
  const { selectedSolAccountContextState, selectedSolAccountContextDispatch } =
    useContext(SelectedSolAccountContext);
  const [isShowPrivateKey, setIsShowPrivateKey] = useState(false);
  const [isAirdropping, setIsAirdropping] = useState(false);
  const [airdropMessage, setAirdropMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [transferRecipient, setTransferRecipient] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferMessage, setTransferMessage] = useState("");
  const [balance, setBalance] = useState(null);
  const togglePrivateKeyVisibility = () => {
    setIsShowPrivateKey(!isShowPrivateKey);
  };

  const connection = new Connection(
    "https://solana-devnet.g.alchemy.com/v2/CNAtFpCtGfjzf138vPcHDgRt9WFIj68s"
  );

  const copyHandler = async () => {
    try {
      // console.log(typeof mnemonics);
      await navigator.clipboard.writeText(
        selectedSolAccountContextState?.publicKey
      );
      console.log(
        "Public key copied to clipboard:",
        selectedSolAccountContextState?.publicKey
      );
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const fetchBalance = async () => {
    if (!selectedSolAccountContextState?.publicKey) return;
    try {
      const pubKey = new PublicKey(selectedSolAccountContextState?.publicKey);
      const balanceLamports = await connection.getBalance(pubKey);
      setBalance(balanceLamports / LAMPORTS_PER_SOL);
    } catch (error) {
      console.log("Failed to fetch the balance : ", error);
    }
  };

  useEffect(() => {
    if (selectedSolAccountContextState?.publicKey) {
      fetchBalance();
    }
  }, [selectedSolAccountContextState, balance]);

  const airdropSol = async () => {
    if (!selectedSolAccountContextState?.publicKey) {
      setAirdropMessage("Public key not available.");
      return;
    }

    setIsAirdropping(true);
    setAirdropMessage("Requesting airdrop...");

    try {
      const pubKey = new PublicKey(selectedSolAccountContextState?.publicKey);
      const airdropSignature = await connection.requestAirdrop(
        pubKey,
        1 * LAMPORTS_PER_SOL
      );
      console.log(airdropSignature);
      setAirdropMessage("Airdrop successful! 1 SOL credited.");
      fetchBalance();
    } catch (error) {
      console.error("Airdrop failed:", error);
      setAirdropMessage("Airdrop failed. Please try again.");
    } finally {
      setIsAirdropping(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const pubKey = new PublicKey(selectedSolAccountContextState?.publicKey);
      const signatures = await connection.getSignaturesForAddress(pubKey);
      setTransactions(signatures);
    } catch (error) {
      console.log(
        "Something went wrong while fetching the tracnsactions : ",
        error
      );
    }
  };

  useEffect(() => {
    fetchTransactions(selectedSolAccountContextState?.publicKey);
  }, [selectedSolAccountContextState]);

  const transferSol = async () => {
    if (!transferRecipient || !transferAmount || transferAmount <= 0) {
      setTransferMessage("Invalid recipient or amount.");
      return;
    }

    setIsTransferring(true);
    setTransferMessage("Initiating Transfer...");

    try {
      const decodedPrivateKey = bs58.decode(
        selectedSolAccountContextState?.privateKey
      );

      const senderKeypair = Keypair.fromSecretKey(decodedPrivateKey);

      const recipientPubkey = new PublicKey(transferRecipient);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderKeypair.publicKey,
          toPubkey: recipientPubkey,
          lamports: transferAmount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await connection.sendTransaction(
        transaction,
        [senderKeypair],
        {
          skipPreflight: false,
          preflightCommitment: "confirmed",
        }
      );

      // Confirm the transaction
      // await connection.confirmTransaction(signature, "confirmed");

      setTransferMessage(`Transfer successful! Signature: ${signature}`);
      console.log("Your transfer was successful");

      // Fetch updated balance after transfer
      fetchBalance();
    } catch (error) {
      console.error("Transfer failed:", error);
      setTransferMessage(
        "Transfer failed. Please check the details and try again."
      );
    } finally {
      setIsTransferring(false);
    }
  };

  // const handleSolTranfer = () => {
  //   console.log("Recipient Publi Key : ", transferRecipient);
  //   console.log("Amount to transfer : ", transferAmount);
  //   if (!transferRecipient || !transferAmount || transferAmount <= 0) {
  //     setTransferMessage("Invalid recipient or amount.");
  //     return;
  //   }
  //   setIsTransferring(true);
  //   setTransferMessage("Initiating Transfer...");

  // };

  return (
    <Card className="max-w-xl">
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">Account</Tabs.Trigger>
          <Tabs.Trigger value="transfer">Transfer</Tabs.Trigger>
          <Tabs.Trigger value="airdrop">AirDrop Sol</Tabs.Trigger>
          <Tabs.Trigger value="transactions">Transactions</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="account">
            <DataList.Root>
              <DataList.Item align="center">
                <DataList.Label minWidth="88px">Account Number</DataList.Label>
                <DataList.Value>
                  {selectedSolAccountContextState?.accountNumber}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Public Key</DataList.Label>
                <DataList.Value>
                  <Flex align="center" gap="2">
                    <Code variant="ghost">
                      {selectedSolAccountContextState?.publicKey}
                    </Code>
                    <CopyIcon
                      className="mr-2 hover:cursor-pointer hover:text-rose-500"
                      onClick={copyHandler}
                    />
                  </Flex>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Privet Key</DataList.Label>
                <DataList.Value>
                  <Flex align="center" gap="2">
                    <Code variant="ghost">
                      {isShowPrivateKey
                        ? selectedSolAccountContextState?.privateKey
                        : "•".repeat(45)}
                    </Code>
                    <IconButton
                      size="1"
                      aria-label={
                        isShowPrivateKey
                          ? "Hide private key"
                          : "Show private key"
                      }
                      color="gray"
                      variant="ghost"
                      onClick={togglePrivateKeyVisibility}
                    >
                      {isShowPrivateKey ? <EyeNoneIcon /> : <EyeOpenIcon />}
                    </IconButton>
                  </Flex>
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label minWidth="88px">Balance (SOL)</DataList.Label>
                <DataList.Value>
                  {balance !== null ? balance : "Loading..."}
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Tabs.Content>
          <Tabs.Content value="transfer">
            <Box>
              <TextField.Root
                className="mb-3.5"
                placeholder="Recipient Public Key..."
                value={transferRecipient}
                onChange={(e) => setTransferRecipient(e.target.value)}
              />
              <TextField.Root
                className="mb-3.5"
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Amount (SOL)"
              />
              <Button
                disabled={!transferRecipient || !transferAmount}
                onClick={transferSol}
              >
                Transfer
              </Button>
              <Text>{transferMessage}</Text>
            </Box>
          </Tabs.Content>

          <Tabs.Content value="airdrop">
            <Box>
              <Button onClick={airdropSol} disabled={isAirdropping}>
                {isAirdropping ? "Airdropping..." : "Request Airdrop"}
              </Button>
              <Text size="2" mt="2" color="red">
                {airdropMessage}
              </Text>
            </Box>
          </Tabs.Content>
          <Tabs.Content value="transactions">
            <Box className="ml-4">
              <ul>
                {transactions.length === 0 ? (
                  <li>No transactions found</li>
                ) : (
                  transactions.map((tx, index) => (
                    <li key={index}>
                      <strong>Signature:</strong> {tx.signature}
                      <br />
                      <strong>Block Time:</strong>{" "}
                      {new Date(tx.blockTime * 1000).toLocaleString()}
                    </li>
                  ))
                )}
              </ul>
            </Box>
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Card>
  );
};
export default AccountCard;
