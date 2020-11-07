import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

const NavBar: React.FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">Planner</Typography>
    </Toolbar>
  </AppBar>
);
export default NavBar;