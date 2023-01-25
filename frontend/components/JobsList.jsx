import { useEffect, useContext } from "react";
import { useProvider } from "wagmi";
// import { ethers } from "ethers";
import { contractContext } from "@/providers/ContractProvider";

// import Contract from "../../backend/artifacts/contracts/Jobs.sol/Jobs.json";

const JobsList = () => {
  const [events] = useContext(contractContext);
  // const provider = useProvider();
  // const provider = new ethers.providers.JsonRpcProvider();
  // const contractAddr = "";

  // useEffect(() => {
  //   const contract = new ethers.Contract(
  //     contractAddr,
  //     Contract.abi,
  //     provider.getSigner()
  //   );
  //   contract.on("jobAdded", (author, desc, price, id, isFinished) => {
  //     console.log("A job was added", desc, price);
  //   });

  //   return () => {
  //     contract.removeAllListeners();
  //   };
  // }, []);

  useEffect(() => {}, [events]);

  return (
    <ul>
      {events.map((event, index) => {
        return <li key={index}>{event.desc}</li>;
      })}
    </ul>
  );
};

export default JobsList;
