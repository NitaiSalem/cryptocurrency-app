import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Menu,
} from "@mui/material";
import {useState} from "react";
import {COLUMNS} from "../utils";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import MoreIcon from "@mui/icons-material/More";

const ColumnsMenu = ({shownColumns, setShownColumns}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

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
        <MoreIcon style={{color: "rgb(110 110 118)"}} />
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
        <FormControl component="fieldset" className="checkbox-container">
          <FormGroup>
            {COLUMNS.map((column) => (
              <FormControlLabel
                key={column}
                style={{
                  transform: "scale(0.8)",
                }}
                value={column}
                onChange={() =>
                  setShownColumns({
                    ...shownColumns,
                    [column]: shownColumns[column] ? false : true,
                  })
                }
                control={
                  <Checkbox
                    checkedIcon={
                      <CheckBoxOutlinedIcon style={{color: "#e28811"}} />
                    }
                    icon={
                      <CheckBoxOutlineBlankOutlinedIcon
                        style={{color: "#e28811"}}
                      />
                    }
                    checked={shownColumns[column] ? true : false}
                  />
                }
                label={column}
                labelPlacement="end"
              />
            ))}
          </FormGroup>
        </FormControl>
      </Menu>
    </div>
  );
};

export default ColumnsMenu;
