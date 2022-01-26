import {Button, Menu, MenuItem} from "@mui/material";
import {useContext, useState} from "react";
import {CoinsContext} from "../App";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const IsolatedMenu = ({coin, coinsHistory, index}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const {setToCompare} = useContext(CoinsContext);

  const handleAddToCompare = (coin, coinHistory) => {
    console.log(" the coin value on click ", coin);
    setToCompare({coin: coin, coinHistory: coinHistory});
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={openMenu}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => handleAddToCompare(coin, coinsHistory[index].chart)}
        >
          Add to compare
        </MenuItem>
        <MenuItem onClick={handleClose}>Delete row</MenuItem>
      </Menu>
    </div>
  );
};

export default IsolatedMenu;
