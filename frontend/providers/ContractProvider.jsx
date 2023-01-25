import { createContext, useState, useEffect } from "react";

import { ethers } from "ethers";
import Contract from "../../backend/artifacts/contracts/Jobs.sol/Jobs.json";
import { useAccount, useProvider, useSigner } from "wagmi";

export const contractContext = createContext();

const ContractProvider = (props) => {
  const [events, setEvents] = useState([]);
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  const { data: signer } = useSigner();

  const contractAddr = process.env.NEXT_PUBLIC_SC_ADDRESS;
  const contractWrite = new ethers.Contract(contractAddr, Contract.abi, signer);
  const contractRead = new ethers.Contract(
    contractAddr,
    Contract.abi,
    provider
  );

  const addEvent = (event) => {
    setEvents((events) => [...events, event]);
  };

  useEffect(() => {
    const getEvents = async () => {
      const evts = await contractRead.queryFilter("jobAdded");
      const events = evts.map((event) => {
        const { desc, author, id, isFinished, price } = event.args;
        return { desc, author, id, isFinished, price };
      });
      console.log({ events });
      setEvents(events);
    };

    if (isConnected) {
      getEvents();
    }
  }, [isConnected]);

  useEffect(() => {
    contractRead.on("jobAdded", (author, desc, price, id, isFinished) => {
      console.log("A job was added", desc, price, id);
      addEvent({ author, desc, price, isFinished, id });
    });

    return () => {
      contractRead.removeAllListeners();
    };
  }, []);

  return (
    <contractContext.Provider value={[events, contractRead, contractWrite]}>
      {props.children}
    </contractContext.Provider>
  );
};

export default ContractProvider;
