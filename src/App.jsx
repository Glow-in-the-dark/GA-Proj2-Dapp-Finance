import React from "react";
import { useEffect, useState } from "react";
import Wallet from "./components/Wallet";
import Analysis from "./components/Analysis";
import useFetch from "./hooks/useFetch"; //importing the hook
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import PageTwo from "./pages/PageTwo";
import PageThree from "./pages/PageThree";

function App() {
  const [coinListApiData, setCoinListApiData] = useState([]);
  const [watchListArr, setWatchListArr] = useState([]);

  const [EthAPI, fetchEthAPI] = useFetch();
  const [EthPrice, setEthPrice] = useState({});
  const [singlePriceDataHistory, fetchData] = useFetch(); //using the new Hook created, to fetch individual historical prices.
  // const [allHistoricalPrices, setAllHistoricalPrices] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToWatchList = (item) => {
    setWatchListArr([...watchListArr, item]);
  };

  const removeFromWatchList = (id) => {
    // Remove via filter by checking each product, and if the "id" is same as the name in the Array, do not include in array.
    let X = localStorage.getItem("persistantArray");
    let arrayX = X.split(",");
    let newArray = arrayX.filter((eachToken, i) => eachToken !== id);
    localStorage.setItem("persistantArray", newArray);
    setWatchListArr(newArray);
  };

  // Function for Fetching CoinGecko BTC/ETH/BNB price Data (Start) -----------------------------
  const fetchSpecificData = async (url, signal) => {
    setIsLoading(true); // show user it is processing/loading
    setError(null);

    try {
      const res = await fetch(url, { signal });

      if (res.status !== 200) {
        throw new Error("something went wrong");
      }
      const jsonData = await res.json(); // Acquired and store the RAW API data here, and convert to JSON format
      setCoinListApiData(jsonData);

      //setEthApiData(jsonData); //this is where it chunks the API data, or selected parts of Data into our "state"
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    }
    setIsLoading(false); // after finish loading.
  };
  // Function for Fetching CoinGecko BTC/ETH/BNB price Data (End)---------------------------------

  useEffect(() => {
    const store = [localStorage.getItem("persistantArray")]; // first, check from localstorage to see if we have value stored there.
    // console.log(store);
    if (store[0] === null) {
      // if it is empty, instantiate it with an empty array list
      setWatchListArr([]);
    } else {
      setWatchListArr(store); // else if we have value in LocalStorage, then we use the values from Localstorage
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    // Batching Query
    let query = ``;
    for (let i = 0; i < watchListArr.length; i++) {
      query += watchListArr[i] + "%2C%20";
    }
    // Fetch Batch Mkt Data
    const FullUrlApi = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${query}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
    if (watchListArr.length > 0) {
      fetchSpecificData(FullUrlApi, controller.signal);
    }

    //Fetch Only Ethereum Price
    // fetchEthAPI(
    //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    // );
    // setEthPrice(EthAPI[0].current_price);

    /////////////////////// Fetch Individual Historical price
    // fetchData(
    //   `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max`
    // );

    // for (let i = 0; i < watchListArr.length; i++) {
    //   /////////  Fetching each of the historical price data
    //   fetchData(
    //     `https://api.coingecko.com/api/v3/coins/${watchListArr[i]}/market_chart?vs_currency=usd&days=max`
    //   );
    //   /////////  collating all list of historical price into a single state.
    //   // setAllHistoricalPrices((prev) => {
    //   //   [...prev, singlePriceDataHistory];
    //   // });
    //   // // check
    //   console.log(singlePriceDataHistory);
    // }

    // cleanup code
    return () => {
      controller.abort();
    };
  }, [watchListArr]);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate replace to="/page-two" />} />
        <Route path="/page-two" element={<PageTwo />} />
        <Route path="/page-three" element={<PageThree />} />
      </Routes>
      <h2>Crypto WatchList</h2>
      {/* {EthPrice} */}
      <br />
      <Wallet EthPrice={EthPrice} />
      <br />
      <Analysis
        addToWatchList={addToWatchList}
        coinListApiData={coinListApiData}
        removeFromWatchList={(index) => removeFromWatchList(index)}
      />
    </div>
  );
}

export default App;
