import { useEffect, useContext } from "react";
import { contractContext } from "@/providers/ContractProvider";

const JobsList = () => {
  const [events] = useContext(contractContext);

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
