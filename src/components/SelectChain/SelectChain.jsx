import { ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  RadioCards,
  Text,
} from "@radix-ui/themes";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChainContext } from "../../contexts/ChainContext";

const SelectChain = () => {
  const { chainContextDispatch } = useContext(ChainContext);
  const [selectedValue, setSelectedValue] = useState("");

  const backHandler = () => {
    window.history.back();
  };

  const nextHandler = () => {
    console.log(selectedValue);
    chainContextDispatch({ type: "selectedChain", payload: selectedValue });
  };

  return (
    <Box className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-lg shadow-xl">
        <button className="sticky top-0 left-0" onClick={backHandler}>
          <ArrowLeftIcon />
        </button>
        <Heading color="crimson" as="h3" className="text-center mb-4">
          Choose your chain
        </Heading>
        <Box>
          <RadioCards.Root
            defaultValue="1"
            columns={{ initial: "1", sm: "1" }}
            onValueChange={(value) => setSelectedValue(value)}
          >
            <RadioCards.Item value="Solana">
              <Flex direction="column" width="100%">
                <Text weight="bold">Solana</Text>
                <Text color="gray">I'd go with Solana</Text>
              </Flex>
            </RadioCards.Item>
            {/* <RadioCards.Item value="Ethereum">
              <Flex direction="column" width="100%">
                <Text weight="bold">Ethereum</Text>
                <Text color="gray">Everybody say E-th!!</Text>
              </Flex>
            </RadioCards.Item> */}
          </RadioCards.Root>
        </Box>
        <div className="flex justify-center items-center">
          <Button
            disabled={!selectedValue}
            radius="large"
            className="mt-4"
            onClick={nextHandler}
          >
            Next
          </Button>
        </div>
      </Card>
    </Box>
  );
};

export default SelectChain;
