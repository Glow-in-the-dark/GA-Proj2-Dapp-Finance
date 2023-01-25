import React from "react";

const Tables = (props) => {
  let HtmlTablesRow = props.coinListApiData.map((each, i) => {
    return (
      <tr
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        key={i}
        id={each.id}
      >
        <td>{i + 1}</td>
        <td>{each.name}</td>
        <td>${each.current_price.toLocaleString("en-US")}</td>
        <td>{each.price_change_percentage_24h.toFixed(2)}%</td>
        <td>${each.fully_diluted_valuation.toLocaleString("en-US")}</td>
        <td>{each.market_cap.toLocaleString("en-US")}</td>
        <td>{(each.market_cap / each.fully_diluted_valuation).toFixed(2)}</td>
        <td>{each.total_volume.toLocaleString("en-US")}</td>
        <td>
          <button
            class="inline-block px-6 py-2.5 bg-green-400 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
            onClick={() => props.removeFromWatchList(each.id)}
          >
            Remove
          </button>
        </td>
      </tr>
    );
  });

  return (
    <div class="relative overflow-x-auto flex justify-center">
      <table class="w-10/12 text-sm text-right text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              #
            </th>
            <th scope="col" class="px-6 py-3">
              Coin
            </th>
            <th scope="col" class="px-6 py-3">
              Price
            </th>
            <th scope="col" class="px-6 py-3">
              % Change
            </th>
            <th scope="col" class="px-6 py-3">
              FDV
            </th>
            <th scope="col" class="px-6 py-3">
              MktCap
            </th>
            <th scope="col" class="px-6 py-3">
              Mkt Cap/FDV
            </th>
            <th scope="col" class="px-6 py-3">
              24h Volume
            </th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        {HtmlTablesRow.length > 0 ? HtmlTablesRow : ""}
      </table>
    </div>
  );
};

export default Tables;
