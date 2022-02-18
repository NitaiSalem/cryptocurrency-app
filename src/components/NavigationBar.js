import {Link} from "react-router-dom";
import {Drawer, Box, List, Divider, ListItem, CssBaseline} from "@mui/material";
import * as React from "react";
import "./navBar.scss";
import UseSwitchesCustom from "../theme/ThemeSwitcher";
import {ThemeContext} from "../theme/ThemeContext";

export default function NavigationBar() {
  const {theme, setTheme} = React.useContext(ThemeContext);
  return (
    <Box sx={{display: "flex"}}>
      <CssBaseline />
      <Drawer
        sx={{
          width: 100,
          flexShrink: 0,
        }}
        variant="permanent"
      >
        <Divider />
        <List className="navList-container">
          <ListItem>
            <Link
              className="nav-link"
              style={{
                textDecoration: "none",
                color: theme === "light" ? "#001145" : "white",
              }}
              to="/"
            >
              Table
            </Link>
          </ListItem>
          <ListItem>
            <Link
              className="nav-link"
              style={{
                textDecoration: "none",
                color: theme === "light" ? "#001145" : "white",
              }}
              to="/Chart"
            >
              Chart
            </Link>
          </ListItem>
          <ListItem id="switch-item">
            <UseSwitchesCustom />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
