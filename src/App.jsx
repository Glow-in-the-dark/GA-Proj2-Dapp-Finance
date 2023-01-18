import React from "react";
import { useEffect, useState } from "react";
import Web3 from "web3";

function App() {
  // web3 part start-----------------
  const [account, setAccount] = useState();
  const [network, setNetwork] = useState();
  const [balance, setBalance] = useState();

  const web3 = new Web3(Web3.givenProvider);
  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    loadBalance();
  }, [account]);

  async function loadBalance() {
    const network = await web3.eth.net.getNetworkType();
    const balance = await web3.eth.getBalance(account);
    // web3.eth.getBalance(account, <2nd parameter>), 2nd parameter is blockheight, gives u your balance at a specific time
    setNetwork(network);
    setBalance((balance / 1e18).toFixed(4));
  }

  async function loadAccounts() {
    const accounts = await web3.eth.requestAccounts();
    setAccount(accounts[0]);
  }
  // web3 part end-----------------
  // Fetching CoinGecko Data--------------
  const [EthPriceApiData, setEthPriceApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSpecificData = async (url, signal) => {
    setIsLoading(true); // show user it is processing/loading
    setError(null);
    setEthPriceApiData(null);

    try {
      const res = await fetch(url, { signal });

      if (res.status !== 200) {
        throw new Error("something went wrong");
      }
      const jsonData = await res.json();
      // console.log(jsonData);
      // console.log(jsonData.ethereum.usd);
      setEthPriceApiData(jsonData.ethereum.usd); //this is where it chunks the API data, or selected parts of Data into our "state"
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    }
    setIsLoading(false); // after finish loading.
  };

  const FullUrlApi =
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&precision=4";

  useEffect(() => {
    const controller = new AbortController();
    fetchSpecificData(FullUrlApi, controller.signal);

    // cleanup code
    return () => {
      controller.abort();
    };
  }, [balance]);
  // Fetching CoinGecko Data (End)--------------

  return (
    <div>
      <h2>GA SEI-41</h2>
      <br />
      <p> Your Account: {account}</p>
      <p>
        Your Balance:({network}):{balance}
      </p>
      <p>Ethereum Price: ${EthPriceApiData}</p>
      <br />
      <p>
        Your wallet has ${(balance * EthPriceApiData).toFixed(2)} USD worth of
        Ethereum
      </p>
    </div>
  );
}

export default App;
