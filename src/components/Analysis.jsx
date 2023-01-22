import React, { useState } from "react";
import Tables from "./Tables";

const Analysis = (props) => {
  const [typeInput, setTypeInput] = useState("");

  const handleChange = (e) => {
    setTypeInput(event.target.value);
    // console.log(typeInput);
  };

  const handleSubmit = () => {
    props.addToWatchList(typeInput);
  };

  return (
    <div>
      <input onChange={handleChange} placeholder="Token ID (coingecko)"></input>
      <button onClick={handleSubmit}> Add </button>
      <br />
      <Tables coinListApiData={props.coinListApiData} />
    </div>
  );
};

export default Analysis;
