import { createContext, useState, useEffect } from "react";

import { ethers } from "ethers";
import Contract from "../../backend/artifacts/contracts/Jobs.sol/Jobs.json";

export const contractContext = createContext();

const ContractProvider = (props) => {
  const [events, setEvents] = useState([]);

  const provider = new ethers.providers.JsonRpcProvider();
  // const contractAddr = "";

  const contractAddr = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const contract = new ethers.Contract(
    contractAddr,
    Contract.abi,
    provider.getSigner()
  );

  const addEvent = (event) => {
    setEvents((events) => [...events, event]);
  };

  useEffect(() => {
    const getEvents = async () => {
      const evts = await contract.queryFilter("jobAdded");
      const events = evts.map((event) => {
        const { desc, author, id, isFinished, price } = event.args;
        return { desc, author, id, isFinished, price };
      });
      console.log({ events });
      setEvents(events);
    };

    getEvents();
  }, []);

  useEffect(() => {
    contract.on("jobAdded", (author, desc, price, id, isFinished) => {
      console.log("A job was added", desc, price, id);
      addEvent({ author, desc, price, isFinished, id });
    });

    return () => {
      contract.removeAllListeners();
    };
  }, []);

  return (
    <contractContext.Provider value={[events, contract]}>
      {props.children}
    </contractContext.Provider>
  );
};

export default ContractProvider;
