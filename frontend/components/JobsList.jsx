import { useEffect } from "react";
import { useProvider } from "wagmi";
import { ethers } from "ethers";

import Contract from "../../backend/artifacts/contracts/Jobs.sol/Jobs.json";

const JobsList = () => {
  const provider = useProvider();
  const contractAddr = "";

  useEffect(() => {
    const contract = new ethers.Contract(contractAddr, Contract.abi, provider);
    contract.on("jobAdded", (author, desc, price, id, isFinished) => {
      console.log("A job was added");
    });

    return () => {
      contract.removeAllListeners();
    };
  }, []);

  return <div>jobs list</div>;
};

export default JobsList;
