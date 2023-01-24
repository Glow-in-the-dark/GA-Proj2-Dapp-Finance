import React from "react";

const Tables = (props) => {
  let HtmlTablesRow = props.coinListApiData.map((each, i) => {
    return each.name;
    //   <tr key={i}>
    //     <td>{i + 1}</td>
    //     <td>{each.name}</td>
    //     <td>{each.current_price}</td>
    //     <td>{each.price_change_percentage_24h}</td>
    //     <td>{each.fully_diluted_valuation}</td>
    //     <td>{each.market_cap}</td>
    //     <td>{each.market_cap / each.fully_diluted_valuation}</td>
    //     <td>{each.total_volume}</td>
    //   </tr>
  });

  return (
    <div>
      <table>
        <tr>
          <th>#</th>
          {/* <th>Coin{props.coinListApiData[0].name}</th> */}
          <th>Price</th>
          <th>% Price Change</th>
          <th>FDV</th>
          <th>MktCap</th>
          <th>Mkt Cap/FDV</th>
          <th>24h Volume</th>
        </tr>
        {HtmlTablesRow}
      </table>
    </div>
  );
};

export default Tables;
