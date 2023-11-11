import { Alchemy, Network } from "alchemy-sdk";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Transactions from "./Transactions";
import Block from "./Block";
import Home from "./Home";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockWithTX, setblockWithTX] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  }, []);

  useEffect((blockNumber) => {
    async function getBlockWithTransactions(blockNumber) {
      setblockWithTX(await alchemy.core.getBlockWithTransactions(blockNumber));
    }

    getBlockWithTransactions(blockNumber);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              blockNumber={blockNumber}
              blockWithTX={blockWithTX}
              alchemy={alchemy}
            />
          }
        />
        <Route
          path="/block"
          element={
            <Block blockNumber={blockNumber} blockWithTX={blockWithTX} />
          }
        />
        <Route
          path="/tx"
          element={
            <Transactions blockNumber={blockNumber} blockWithTX={blockWithTX} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
