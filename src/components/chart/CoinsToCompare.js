import {useContext} from "react";
import {CoinsContext} from "../../App";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button, IconButton} from "@mui/material";
import "./coinsToCompare.scss";
import {fetchPriceHistory} from "../../utils";

const CoinsToCompare = ({setCurrentCoin, currentCoin}) => {
  const {toCompare, setToCompare} = useContext(CoinsContext);

  const deleteCoin = async (coinId) => {
    const updatedToCompare = toCompare.filter(
      (coinObj) => coinObj.coinId !== coinId
    );
    setToCompare(updatedToCompare);

    if (coinId === currentCoin.coinId && toCompare.length > 1) {
      const newCurrentCoin = updatedToCompare[updatedToCompare.length - 1];
      updateCurrent(newCurrentCoin, currentCoin);
    } else if (toCompare.length === 1) {
      setCurrentCoin(undefined);
    }
  };

  const updateCurrent = async (toCompareCoin, currentCoin) => {
    const updatedHistoryPeriod = await fetchPriceHistory(
      toCompareCoin.coinId,
      currentCoin.coinTimePeriod
    );
    setCurrentCoin({
      ...toCompareCoin,
      coinHistory: updatedHistoryPeriod,
      coinTimePeriod: currentCoin.coinTimePeriod,
    });
  };

  return (
    <div className="coins-to-compare-container">
      {toCompare.map((coinObj) => {
        const className =
          coinObj.coinId === currentCoin.coinId ? "active-coin" : "normal-coin";
        return (
          <div key={coinObj.coinId} className="single-coin-cointainer">
            <Button
              onClick={() => updateCurrent(coinObj, currentCoin)}
              variant="text"
              className={className}
            >
              <img
                className="to-compare-icon"
                src={coinObj.coin.icon}
                alt="icon"
                style={{height: "25px"}}
              ></img>
              &nbsp;
              <p className="to-compare-text">
                {coinObj.coin.name}

                <span style={{color: "rgb(83, 83, 83,0.6)"}}>
                  &nbsp; &#8226; &nbsp;
                  {coinObj.coin.symbol}{" "}
                </span>
              </p>
            </Button>

            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => deleteCoin(coinObj.coinId)}
            >
              <DeleteIcon
                style={{
                  transform: "scale(0.7)",
                }}
              />
            </IconButton>
          </div>
        );
      })}
    </div>
  );
};

export default CoinsToCompare;
