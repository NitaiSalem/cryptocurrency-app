import {Link} from "react-router-dom";
import {Drawer, Box, List, Divider, ListItem, CssBaseline} from "@mui/material";

import * as React from "react";
import "./navBar.scss";

export default function NavigationBar() {
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
              style={{textDecoration: "none", color: "#001145"}}
              to="/"
            >
              Table
            </Link>
          </ListItem>
          <ListItem>
            <Link
              className="nav-link"
              style={{textDecoration: "none", color: "#001145"}}
              to="/Chart"
            >
              Chart
            </Link>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
