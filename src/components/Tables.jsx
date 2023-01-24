import React from "react";

const Tables = (props) => {
  let HtmlTablesRow = props.coinListApiData.map((each, i) => {
    return (
      <tr key={i}>
        <td>{i + 1}</td>
        <td>{each.name}</td>
        <td>${each.current_price.toLocaleString("en-US")}</td>
        <td>{each.price_change_percentage_24h.toFixed(2)}%</td>
        <td>${each.fully_diluted_valuation.toLocaleString("en-US")}</td>
        <td>{each.market_cap.toLocaleString("en-US")}</td>
        <td>{(each.market_cap / each.fully_diluted_valuation).toFixed(2)}</td>
        <td>{each.total_volume.toLocaleString("en-US")}</td>
        <td>
          <button onClick={() => props.removeFromWatchList(i)}>Remove</button>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <tr>
          <th>#</th>
          <th>Coin</th>
          <th>Price</th>
          <th>% Price Change</th>
          <th>FDV</th>
          <th>MktCap</th>
          <th>Mkt Cap/FDV</th>
          <th>24h Volume</th>
          <th>Remove</th>
        </tr>
        {HtmlTablesRow}
      </table>
    </div>
  );
};

export default Tables;
