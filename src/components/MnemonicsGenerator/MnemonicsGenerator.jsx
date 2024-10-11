import { generateMnemonic } from "bip39";
import { Box, Button, Card, Heading, Text } from "@radix-ui/themes";
import { useContext, useEffect } from "react";
import { MnemonicsContext } from "../../contexts/MnemonicsContext";
import { RawMnemonicsContext } from "../../contexts/RawMnemonicsContext";
const MnemonicsGenerator = () => {
  const { mnemonicsContextDispatch } = useContext(MnemonicsContext);
  const { rawMnemonicsContextDispatch } = useContext(RawMnemonicsContext);
  const phraseGenerateHandler = async () => {
    const mnemonics = generateMnemonic();
    rawMnemonicsContextDispatch({
      type: "setRawMnemonics",
      payload: mnemonics,
    });
    const mnArray = mnemonics.split(" ");
    mnemonicsContextDispatch({ type: "setMnemonics", payload: mnArray });
  };

  //   useEffect(() => {
  //     console.log("Your Raw Mnemonic Phrases", rawMnemonicsContextState);
  //     console.log("Your Mnemonic Phrases", mnemonicsContextState);
  //   }, [rawMnemonicsContextState, mnemonicsContextState]);

  return (
    <Box className="flex justify-center items-center min-h-screen">
      <Card className="flex flex-col justify-around items-center min-w-96 min-h-96 shadow-xl">
        <Box>
          <Heading as="h6" size={"6"}>
            Create a new wallet
          </Heading>
          <Text color="gray" size={"4"}>
            Make sure to save your seed phrase.
          </Text>
        </Box>
        <Button onClick={phraseGenerateHandler} radius="large">
          Generate Phrase
        </Button>
      </Card>
    </Box>
  );
};

export default MnemonicsGenerator;
