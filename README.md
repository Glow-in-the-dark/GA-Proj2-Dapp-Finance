# GA-Proj-Basic-Dapp (_Reflections_)

## Technologies used.

### 1) Javascript + React Framework.

- useState / Props / ReactRouter6 / Custom hooks
- using "localStorage" to do persistent storage locally

### 2) CSS / tailwinds / UIUX

- used tailwinds to apply CSS.

### 3) Connecting to Web3

- connecting to web3, via using the web3.js library.
- retrieve data from testnet/mainnet.

### 4) API Fetching

- fetched CoinGecko API for Market Data

Learning Points:

1. using a useFetch (custom hook) to fetch, might need to take note of the data return, because you cannot so async/await directly, and the computer will process the next statement before fetching all the data.
2. a workaround would be to use the first useEffect() fetch the API, and store it in the state, then use another useEffect(), that activates on the previous state change, and use the data inside.
3. when upon mount, and fetching of the data have yet to finish, therefore calling of the data, from the dependent components. will keep resulting in errors, behind.
   soln) write a function for validation as a "stopper" function, which unless it is validated, it will proceed to assign the value, such that it will then be a valid value to be used by the dependants components.

## General Approach

1. started off with wireframing how the site would be displayed
2. creating a parent/child hierarchy, to decide on how to split the components.
3. fetch the APIs to make sure it is working
4. create the components, and work on the functionality
5. connect all components together, using props and lifting states
6. link everything together with react router6
7. work on the CSS.

## Functionality

Web3 Wallet

- A simple prompt to login your web3 wallet, would automatically appear.
- Sign in your web wallet and approve.
- You will automatically be displayed your "holdings", and multiplied by the currrent price.

My WatchList

- key in the token ID, which represent the assets you want to track. ( if unsure, you can check Coingecko's tokenID)
- Use the ADD button to add Assets to track
- Use the remove Buttom to remove from your tracking page.

## Where it could have been improved on. (Further work and Features)

due to time constraints, this app is build for basic functionality, however, further works could be added upon it, such as

1. web3 wallet to read all of the erc20 tokens, and match the amount to the respective token price. These can then be multiplied to form a dynamic portfolio tracker.
2. using coingecko API, daily prices of assets can also be retrieved, these can then be mapped out, and used for analysis, be it exploratory analysis like correlation matrix, or backtesting of a lower frequency algorithmic trading system.
3. with the web3.js library, we can also build a front end to directly link to smart contract, to execute it.

## Credits

- Coingecko API.
- Web3.js
- Tailwinds
