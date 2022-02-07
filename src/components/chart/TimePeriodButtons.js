import {IconButton} from "@mui/material";
import {useState} from "react";
import {fetchPriceHistory} from "../../utils";
import "./chart.scss";
import MoreTimeIcon from "@mui/icons-material/MoreTime";

const button_Data = [
  {
    name: "24H",
    value: "24h",
  },
  {
    name: "1W",
    value: "1w",
  },
  {
    name: "1M",
    value: "1m",
  },
  {
    name: "3M",
    value: "3m",
  },
  {
    name: "6M",
    value: "6m",
  },
  {
    name: "1Y",
    value: "1y",
  },
  {
    name: "ALL",
    value: "all",
  },
];

const TimePeriodButtons = ({setCurrentCoin, currentCoin}) => {
  const [activeButton, setActiveButton] = useState(button_Data[0].name);

  const updatePeriod = async (name, coinId, time) => {
    const updatedCoinPeriod = await fetchPriceHistory(coinId, time);
    console.log("the updated time response ", updatedCoinPeriod);
    setCurrentCoin({...currentCoin, coinHistory: updatedCoinPeriod});
    setActiveButton(name);
  };

  return (
    <div className="time-buttons-container">
      <MoreTimeIcon />
      {button_Data.map((item) => {
        const className = activeButton === item.name ? "active" : "normalstuff";

        return (
          <div key={item.value}>
            <IconButton
              className={className}
              name={item.name}
              value={item.value}
              onClick={() => {
                updatePeriod(item.name, currentCoin.coinId, item.value);
              }}
            >
              {item.name}
            </IconButton>
          </div>
        );
      })}
    </div>
  );
};

export default TimePeriodButtons;
