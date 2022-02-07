import "./App.scss";
import React, {useEffect, useState} from "react";
import {Routes, Route, HashRouter} from "react-router-dom";
import {createContext} from "react";
import NavigationBar from "./components/NavigationBar";
import Chart from "./components/chart/Chart";
import TableComponent from "./components/Table";
import {fetchCoins, fetchPriceHistory} from "./utils";

export const CoinsContext = createContext();

function App() {
  const [coins, setCoins] = useState([]);
  const [coinsHistory, setCoinsHistory] = useState([]);
  const [toCompare, setToCompare] = useState([]);

  const getDatafromApi = async () => {
    const coinsData = await fetchCoins();

    getCoinsHistory(coinsData.coins);
    setCoins(coinsData.coins);
  };

  useEffect(() => {
    getDatafromApi();
  }, []);

  const getCoinsHistory = async (coins) => {
    const priceHistories = await Promise.all(
      coins.map((coin) => {
        return fetchPriceHistory(coin.id, "1w");
      })
    );
    setCoinsHistory(priceHistories);
  };

  return (
    <div className="app-container">
      <CoinsContext.Provider
        value={{
          coins,
          setCoins,
          coinsHistory,
          setCoinsHistory,
          setToCompare,
          toCompare,
        }}
      >
        <HashRouter basename="/">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<TableComponent />} />
            <Route path="/Chart" element={<Chart />} />
          </Routes>
        </HashRouter>
      </CoinsContext.Provider>
    </div>
  );
}

export default App;
