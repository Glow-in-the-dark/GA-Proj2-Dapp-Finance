import React, { useState, useEffect } from "react";
import Web3 from "web3";

const Wallet = (props) => {
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

  return (
    <div>
      <p> Your Account: {account}</p>
      <p>
        Your Balance:({network}):{balance}
      </p>
      <p>Ethereum Price: ${props.EthPrice.current_price}</p>
      <br />
      <p>
        Your wallet has ${(balance * props.EthPrice.current_price).toFixed(2)}{" "}
        USD worth of Ethereum
      </p>
    </div>
  );
};

export default Wallet;
