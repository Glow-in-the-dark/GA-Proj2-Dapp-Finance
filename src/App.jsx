import React from "react";
import { useEffect, useState } from "react";
import Wallet from "./components/Wallet";
import Analysis from "./components/Analysis";
import useFetch from "./hooks/useFetch"; //importing the hook

function App() {
  const [coinListApiData, setCoinListApiData] = useState([]);
  const [EthApiData, setEthApiData] = useState({});
  const [watchListArr, setwatchListArr] = useState([
    "bitcoin",
    "ethereum",
    "binancecoin",
  ]);
  const [singlePriceDataHistory, fetchData] = useFetch(); //using the new Hook created, to fetch individual historical prices.
  const [allHistoricalPrices, setAllHistoricalPrices] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToWatchList = (item) => {
    setwatchListArr([...watchListArr, item]);
  };

  const removeFromWatchList = (index) => {
    const newArray = watchListArr.filter((eachToken, i) => i !== index); // filter by checking each product, and if the index is same as the index passed, do not include in array.
    setwatchListArr(newArray);
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
      // console.log(jsonData);
      // console.log(jsonData[0].id);
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
    const controller = new AbortController();
    let query = ``;
    for (let i = 0; i < watchListArr.length; i++) {
      query += watchListArr[i] + "%2C%20";
    }
    // Fetch Batch Mkt Data
    const FullUrlApi = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${query}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`;
    fetchSpecificData(FullUrlApi, controller.signal);

    /////////////////////// Fetch Individual Historical price
    // fetchData(
    //   `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=max`
    // );

    for (let i = 0; i < watchListArr.length; i++) {
      /////////  Fetching each of the historical price data
      fetchData(
        `https://api.coingecko.com/api/v3/coins/${watchListArr[i]}/market_chart?vs_currency=usd&days=max`
      );
      /////////  collating all list of historical price into a single state.
      // setAllHistoricalPrices((prev) => {
      //   [...prev, singlePriceDataHistory];
      // });
      // // check
      console.log(singlePriceDataHistory);
    }

    //////////////////////// Getting Price
    // var data = [];
    // var cols = "abcdefghijklmnopqrstuvwxyz".split("");
    // console.log(cols);
    // for (var i = 0; i <= 30; i++) {
    //   var obj = { index: i };
    //   cols.forEach((col) => {
    //     obj[col] = jz.num.randBetween(1, 100);
    //   });
    //   data.push(obj);
    //   console.log(obj);
    // }
    // console.log(data);

    // cleanup code
    return () => {
      controller.abort();
    };
  }, [watchListArr]);

  return (
    <div>
      {/* {JSON.stringify(coinListApiData)} */}
      <h2>GA SEI-41</h2>
      <br />
      {/* <Wallet EthPrice={EthApiData} /> */}
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
