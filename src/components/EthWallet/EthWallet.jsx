import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { Box, Card, Heading, Text } from "@radix-ui/themes";

export const EthWallet = ({ mnemonic }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);

  return (
    <Box className="min-h-screen flex justify-center items-center">
      {/* <div>
        <button
          onClick={async function () {
            const seed = await mnemonicToSeed(mnemonic);
            const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
            const hdNode = HDNodeWallet.fromSeed(seed);
            const child = hdNode.derivePath(derivationPath);
            const privateKey = child.privateKey;
            const wallet = new Wallet(privateKey);
            setCurrentIndex(currentIndex + 1);
            setAddresses([...addresses, wallet.address]);
          }}
        >
          Add ETH wallet
        </button>

        {addresses.map((p) => (
          <div>Eth - {p}</div>
        ))}
      </div> */}
      <Card>
        <Heading align={"center"}>Ethereum wallet</Heading>
        <Text>Hold your horses mate. This will be coming soon</Text>
      </Card>
    </Box>
  );
};
export default EthWallet;
