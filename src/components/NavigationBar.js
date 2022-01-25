import {Link} from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";

const drawerWidth = 100;

export default function NavigationBar() {
  return (
    <Box sx={{display: "flex"}}>
      <CssBaseline />

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Divider />
        <List>
          <ListItem>
            <Link style={{textDecoration: "none", color:"#001145"}} to="/">Table</Link>
          </ListItem>
          <ListItem>
            <Link style={{textDecoration: "none", color:"#001145"}} to="/Chart">Chart</Link>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}


