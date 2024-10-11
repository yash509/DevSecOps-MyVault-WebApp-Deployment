import {
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Text,
} from "@radix-ui/themes";
import { useContext, useState } from "react";
import { MnemonicsContext } from "../../contexts/MnemonicsContext";
import { CopyIcon } from "@radix-ui/react-icons";
import { RawMnemonicsContext } from "../../contexts/RawMnemonicsContext";
import { SavedPhraseContext } from "../../contexts/SavedPhrase";

const MnemonicsDisplay = () => {
  const { mnemonicsContextState } = useContext(MnemonicsContext);
  const { savedPhraseContextDispatch } = useContext(SavedPhraseContext);
  const [isChecked, setIsChecked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const copyHandler = async () => {
    try {
      const mnemonics = mnemonicsContextState.join(" ");
      // console.log(typeof mnemonics);
      await navigator.clipboard.writeText(mnemonics);
      setIsCopied(true);
      console.log("Mnemonic copied to clipboard:", mnemonics);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  const checkBoxChangeHandler = (event) => {
    setIsChecked(event.target.checked);
  };
  const nextHandler = () => {
    savedPhraseContextDispatch({ type: "setIsSavedPhrase", payload: true });
  };
  return (
    <Box className="flex justify-around items-center min-h-screen">
      <Card className="max-w-xl">
        <Heading className="m-4 hover:cursor-default" align={"center"}>
          Secret recovery phrase
        </Heading>
        <Text
          className="mb-6 hover:cursor-default"
          as="div"
          color="gray"
          align={"center"}
        >
          This is the only way to recover your account if you lose your device.
          Write it down and store it in the safe place.
        </Text>
        <Card className="mb-10">
          <Grid columns={"4"} gap={"3"} rows={"3"} width="auto">
            {mnemonicsContextState.map((mnemonic) => (
              <Badge
                className="hover:text-rose-500 hover:cursor-default"
                color="gray"
                variant="surface"
                highContrast
                key={mnemonic}
              >
                {mnemonic}
              </Badge>
            ))}
          </Grid>
        </Card>
        <Box as="div" className="flex flex-col justify-around items-center ">
          <Box className="flex justify-center items-center mb-4">
            <CopyIcon
              className="mr-2 hover:cursor-pointer hover:text-rose-500"
              onClick={copyHandler}
            />
            <Text className="hover:cursor-pointer" as="label" weight={"light"}>
              {isCopied ? "Copied!" : "Copy"}
            </Text>
          </Box>
          <Text className="mb-4" color="gray" as="label" size="2">
            <Flex gap="2">
              <input
                className="accent-rose-500"
                type="checkbox"
                checked={isChecked}
                onChange={checkBoxChangeHandler}
              />
              I have saved the recovery phrase
            </Flex>
          </Text>

          <Button onClick={nextHandler} disabled={!isChecked}>
            Next
          </Button>
        </Box>
      </Card>
    </Box>
  );
};
export default MnemonicsDisplay;
