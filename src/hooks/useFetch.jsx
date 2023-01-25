import React, { useState } from "react";

const useFetch = () => {
  const [data, setData] = useState([]);

  const fetchData = async (url) => {
    try {
      const res = await fetch(url);

      // If fetch error, throw error
      if (res.status !== 200) {
        throw new Error("something went wrong");
      }
      //Else continue, parse data, and store the data.
      const resData = await res.json();
      setData(resData);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message);
      }
    }
  };

  return [data, fetchData];
};

export default useFetch;
