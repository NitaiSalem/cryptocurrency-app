import {Button, Menu, MenuItem} from "@mui/material";
import {useContext, useState} from "react";
import {CoinsContext} from "../App";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {fetchPriceHistory} from "../utils";

const OptionsMenu = ({coin, index, handleDelete}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const {setToCompare, toCompare} = useContext(CoinsContext);

  const handleAddToCompare = async (coin) => {
    setAnchorEl(null);

    if (!toCompare.find(({coinId}) => coinId === coin.id)) {
      const coinId = coin.id;
      const coinTimePeriod = "24h";
      const coinHistory = await fetchPriceHistory(coinId, coinTimePeriod);
      setToCompare([...toCompare, {coinId, coin, coinHistory, coinTimePeriod}]);
    }
  };

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={isOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={openMenu}
      >
        <MoreVertIcon style={{color: "rgb(110 110 118)"}} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={isOpen}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => handleAddToCompare(coin)}>
          Add to compare
        </MenuItem>
        <MenuItem onClick={() => handleDelete(coin, index)}>
          Delete row
        </MenuItem>
      </Menu>
    </div>
  );
};

export default OptionsMenu;
