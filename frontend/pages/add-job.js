import { useState, useContext } from "react";
import { ethers } from "ethers";
import { contractContext } from "@/providers/ContractProvider";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";

const AddJob = () => {
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(null);
  const [_, _contractRead, contractWrite] = useContext(contractContext);
  const addJob = async () => {
    await contractWrite.addJob(desc, { value: price });
  };

  return (
    <FormControl>
      <FormLabel>Description</FormLabel>
      <Input
        type="text"
        placeholder="The description of the job"
        onChange={(e) => setDesc(e.target.value)}
      />

      <FormLabel>Price</FormLabel>
      <Input
        type="text"
        placeholder="How much you will pay your worker in ETH"
        onChange={(e) => setPrice(e.target.value)}
      />
      <Button onClick={addJob}>Add</Button>
    </FormControl>
  );
};

export default AddJob;
