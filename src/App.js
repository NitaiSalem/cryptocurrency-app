import "./App.scss";
import React, {useEffect, useState} from "react";
import {Routes, Route, HashRouter} from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {createContext} from "react";
import NavigationBar from "./components/NavigationBar";
import Chart from "./components/chart/Chart";
import TableComponent from "./components/Table";
import {fetchCoins, fetchPriceHistory} from "./utils";
import {ThemeContext} from "./theme/ThemeContext";
export const CoinsContext = createContext();

function App() {
  const [coins, setCoins] = useState([]);
  const [coinsHistory, setCoinsHistory] = useState([]);
  const [toCompare, setToCompare] = useState([]);
  const [timePeriod, setTimePeriod] = useState("24h");
  const [theme, setTheme] = useState("light");
  const themeValue = {theme, setTheme};

  const theme1 = createTheme({
    palette: {mode: theme},
  });

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
      <ThemeContext.Provider value={themeValue}>
        <CoinsContext.Provider
          value={{
            coins,
            setCoins,
            coinsHistory,
            setCoinsHistory,
            setToCompare,
            toCompare,
            timePeriod,
            setTimePeriod,
            theme,
            setTheme,
          }}
        >
          <HashRouter basename="/">
            <ThemeProvider theme={theme1}>
              <NavigationBar />
              <Routes>
                <Route path="/" element={<TableComponent />} />
                <Route path="/Chart" element={<Chart />} />
              </Routes>
            </ThemeProvider>
          </HashRouter>
        </CoinsContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
