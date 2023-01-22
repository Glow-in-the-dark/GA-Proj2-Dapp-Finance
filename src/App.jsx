import React from "react";
import { useEffect, useState } from "react";
import Wallet from "./components/Wallet";

function App() {
  const [BtcApiData, setBtcApiData] = useState({});
  const [EthApiData, setEthApiData] = useState({});
  const [BnbApiData, setBnbApiData] = useState({});
  const [watchListArr, setwatchListArr] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function for Fetching CoinGecko BTC/ETH/BNB price Data (Start) --------------
  const fetchSpecificData = async (url, signal) => {
    setIsLoading(true); // show user it is processing/loading
    setError(null);

    try {
      const res = await fetch(url, { signal });

      if (res.status !== 200) {
        throw new Error("something went wrong");
      }
      const jsonData = await res.json(); // Acquired and store the RAW API data here, and convert to JSON format
      // console.log(jsonData);
      // console.log(jsonData[0].id);

      if (jsonData[0].id == "bitcoin") {
        setBtcApiData(jsonData[0]);
      } else if (jsonData[0].id == "ethereum") {
        setEthApiData(jsonData[0]);
      } else {
        setBnbApiData(jsonData[0]);
      }

      if (jsonData[1].id == "bitcoin") {
        setBtcApiData(jsonData[1]);
      } else if (jsonData[1].id == "ethereum") {
        setEthApiData(jsonData[1]);
      } else {
        setBnbApiData(jsonData[1]);
      }

      if (jsonData[2].id == "bitcoin") {
        setBtcApiData(jsonData[2]);
      } else if (jsonData[2].id == "ethereum") {
        setEthApiData(jsonData[2]);
      } else {
        setBnbApiData(jsonData[2]);
      }

      console.log("watchlist", watchListArr);

      console.log(BtcApiData);
      console.log(EthApiData);
      console.log(BnbApiData);

      //setEthApiData(jsonData); //this is where it chunks the API data, or selected parts of Data into our "state"
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    }
    setIsLoading(false); // after finish loading.
  };
  // Function for Fetching CoinGecko BTC/ETH/BNB price Data (End)--------------

  const FullUrlApi =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20binancecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h";

  useEffect(() => {
    const controller = new AbortController();
    fetchSpecificData(FullUrlApi, controller.signal);

    // cleanup code
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div>
      <h2>GA SEI-41</h2>
      <br />
      <Wallet EthPrice={EthApiData} />
      <br />
      {/* <Analysis /> */}
    </div>
  );
}

export default App;
