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
      <br />
      <h2 class="font-semibold text-3xl mb-5 flex space-x-2 justify-center">
        Crypto WatchList
      </h2>
      <div class="flex space-x-2 justify-center">
        <input
          onChange={handleChange}
          placeholder="Token ID (coingecko)"
          type="text"
          class="
          form-control
          w-3/12
          px-3
          py-1.5
          text-base
          font-normal
          text-gray-700
          bg-white bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          m-0
          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
        "
        ></input>

        <button
          onClick={handleSubmit}
          type="button"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
          className="inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Add
        </button>
      </div>
      <br />
      <br />
      <Tables
        coinListApiData={props.coinListApiData}
        removeFromWatchList={(index) => props.removeFromWatchList(index)}
      />
    </div>
  );
};

export default Analysis;
