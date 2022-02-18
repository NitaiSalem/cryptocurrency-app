import {IconButton} from "@mui/material";
import {fetchPriceHistory} from "../../utils";
import "./chart.scss";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import {BUTTON_DATA} from "../../utils";

const TimePeriodButtons = ({setCurrentCoin, currentCoin}) => {
  const updatePeriod = async (coinId, time) => {
    const updatedCoinPeriod = await fetchPriceHistory(coinId, time);

    setCurrentCoin({
      ...currentCoin,
      coinHistory: updatedCoinPeriod,
      coinTimePeriod: time,
    });
  };
  return (
    <div className="time-buttons-container">
      <MoreTimeIcon />
      {BUTTON_DATA.map((item) => {
        const className =
          currentCoin?.coinTimePeriod === item.value ? "active" : "normal";

        return (
          <div key={item.value}>
            <IconButton
              className={className}
              name={item.name}
              value={item.value}
              onClick={() => {
                updatePeriod(currentCoin.coinId, item.value);
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
