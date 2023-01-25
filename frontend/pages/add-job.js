import { useState, useContext } from "react";
import { ethers } from "ethers";
import { useProvider } from "wagmi";
import Contract from "../../backend/artifacts/contracts/Jobs.sol/Jobs.json";
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
  const contract = useContext(contractContext);
  // const contractAddr = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  // const provider = useProvider();
  // const provider = new ethers.providers.JsonRpcProvider();
  // const contract = new ethers.Contract(
  //   contractAddr,
  //   Contract.abi,
  //   provider.getSigner()
  // );
  const addJob = async () => {
    // const signer = provider.getSigner();
    // console.log(signer);
    // console.log(contract);
    // console.log(provider);
    await contract.addJob(desc, { value: price });
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
