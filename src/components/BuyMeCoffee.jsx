import abi from "./BuyMeACoffee.json";
import { ethers } from "ethers";
import Web3 from "web3";
import React, { useEffect, useState } from "react";

const BuyMeCoffee = (props) => {
  // instantiate Contract Address & ABI
  const contractAddress = "0x3A2Bd6b33E8D30b0Cb04511aC5744BC9516B561d";
  const contractABI = abi.abi;

  // Component state
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState([]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts: ", accounts);

      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("please install MetaMask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const buyCoffee = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("buying coffee..");
        const coffeeTxn = await buyMeACoffee.buyCoffee(
          name ? name : "anon",
          message ? message : "Enjoy your coffee!",
          { value: ethers.utils.parseEther("0.001") }
        );

        await coffeeTxn.wait();

        console.log("mined ", coffeeTxn.hash);

        console.log("coffee purchased!");

        // Clear the form fields.
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all memos stored on-chain.
  const getMemos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );

        console.log("fetching memos from the blockchain..");
        const memos = await buyMeACoffee.getMemos();
        console.log("fetched!");
        setMemos(memos);
      } else {
        console.log("Metamask is not connected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let buyMeACoffee;
    isWalletConnected();
    getMemos();

    // Create an event handler function for when someone sends
    // us a new memo.
    const onNewMemo = (from, timestamp, name, message) => {
      console.log("Memo received: ", from, timestamp, name, message);
      setMemos((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message,
          name,
        },
      ]);
    };

    const { ethereum } = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
      buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);

      buyMeACoffee.on("NewMemo", onNewMemo);
    }

    return () => {
      if (buyMeACoffee) {
        buyMeACoffee.off("NewMemo", onNewMemo);
      }
    };
  }, []);

  return (
    <div className="container mx-auto bg-slate-200 p-6 mt-12 ">
      <h1 className="text-4xl font-extrabold dark:text-white flex justify-center">
        Buy G.Low a Coffee!
      </h1>

      <br />

      {currentAccount ? (
        <div className="flex justify-center">
          <form>
            <div class="formgroup">
              <label>Name</label>
              <br />

              <input
                className="w-56"
                id="name"
                type="text"
                placeholder="anon"
                onChange={onNameChange}
              />
            </div>
            <br />
            <div class="formgroup">
              <label>Send G.Low a message</label>
              <br />

              <textarea
                className="w-56"
                rows={3}
                placeholder="Enjoy your coffee!"
                id="message"
                onChange={onMessageChange}
                required
              ></textarea>
            </div>
            <br />
            <div>
              <button
                type="button"
                class="text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2"
                onClick={buyCoffee}
              >
                <svg
                  class="w-4 h-4 mr-2 -ml-1 text-[#626890]"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="ethereum"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
                  ></path>
                </svg>
                Send 1 Coffee for 0.001ETH
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button onClick={connectWallet}> Connect your wallet </button>
      )}

      <br />
      {currentAccount && (
        <h1 className="text-4xl font-extrabold dark:text-white flex justify-center">
          Memos received
        </h1>
      )}

      {currentAccount &&
        memos.map((memo, idx) => {
          return (
            <div
              key={idx}
              style={{
                border: "2px solid",
                "border-radius": "5px",
                padding: "5px",
                margin: "5px",
              }}
            >
              <p style={{ "font-weight": "bold" }}>"{memo.message}"</p>
              <p>
                From: {memo.name} at {memo.timestamp.toString()} Timestamp
              </p>
            </div>
          );
        })}
      <br />
      <p className="flex justify-center">
        Contract Address: 0x3A2Bd6b33E8D30b0Cb04511aC5744BC9516B561d{" "}
      </p>
      <p className="flex justify-center">
        https://goerli.etherscan.io/tx/0x2abb1443e30f5c21cd9d10399a338245b179bbde033e4285fda24ee30d415c9d
      </p>
      <footer className="flex justify-center">
        Thanks and Credits to @thatguyintech
      </footer>
    </div>
  );
};

export default BuyMeCoffee;
