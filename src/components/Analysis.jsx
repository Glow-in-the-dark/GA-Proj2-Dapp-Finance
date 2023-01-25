import React, { useState } from "react";
import Tables from "./Tables";

const Analysis = (props) => {
  const [typeInput, setTypeInput] = useState("");

  const handleChange = (e) => {
    setTypeInput(event.target.value.toLowerCase());
    // console.log(typeInput);
  };

  const handleSubmit = () => {
    // On Submitting, update the main watchListArr state,
    props.addToWatchList(typeInput);
    // On Submitting, also update the "localeStorage", with the "key" called persistantArray
    const store = [localStorage.getItem("persistantArray")]; // store the value of .getItem to store.
    // if empty, get the Key, and the Input Value. and if there is a value, spread it and put the new value behind, so it becomes an array.
    if (store[0] === null) {
      localStorage.setItem("persistantArray", typeInput);
    } else {
      let X = localStorage.getItem("persistantArray");
      //console.log(typeof X); // string (type)
      X = [...[X], typeInput];
      localStorage.setItem("persistantArray", X);
    }
  };

  return (
    <div>
      <input onChange={handleChange} placeholder="Token ID (coingecko)"></input>
      <button onClick={handleSubmit}> Add </button>
      <br />
      <Tables
        coinListApiData={props.coinListApiData}
        removeFromWatchList={(index) => props.removeFromWatchList(index)}
      />
    </div>
  );
};

export default Analysis;
