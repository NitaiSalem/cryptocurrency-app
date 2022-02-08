import {useContext} from "react";
import {CoinsContext} from "../../App";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button, IconButton} from "@mui/material";
import "./coinsToCompare.scss";

const CoinsToCompare = ({setCurrentCoin}) => {
  const {toCompare, setToCompare} = useContext(CoinsContext);

  const deleteCoin = (coinId) => {
    const updatedToCompare = toCompare.filter(
      (coinObj) => coinObj.coinId !== coinId
    );
    setToCompare(updatedToCompare);
    setCurrentCoin(updatedToCompare[updatedToCompare.length - 1]);
  };

  return (
    <div className="coins-to-compare-container">
      {toCompare.map((currentCoin) => (
        <div key={currentCoin.id} className="single-coin-cointainer">
          <Button
            onClick={() => setCurrentCoin(currentCoin)}
            variant="text"
            style={{color: "black"}}
            sx={{
              ":hover": {
                bgcolor: "rgb(109, 190, 245)", // theme.palette.primary.main
                color: "white",
              },
            }}
          >
            <img
              src={currentCoin.coin.icon}
              alt="icon"
              style={{height: "25px"}}
            ></img>
            <p>
              {currentCoin.coin.name}
              <span>
                <span style={{fontSize: "20px"}}>&#8226; </span>
                {currentCoin.coin.symbol}
              </span>
            </p>
          </Button>

          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => deleteCoin(currentCoin.coinId)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      ))}
    </div>
  );
};

export default CoinsToCompare;
