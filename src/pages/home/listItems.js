import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '@mui/icons-material/Home';
import Person from '@mui/icons-material/Person';
import AltRoute from '@mui/icons-material/AltRoute';
import LayersIcon from '@mui/icons-material/Layers';
import ContentPaste from '@mui/icons-material/ContentPaste';
import { Link } from "react-router-dom";
import ListSubheader from "@mui/material/ListSubheader";
import Assignment from '@mui/icons-material/Assignment';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/home">
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItemButton>

    <ListItemButton component={Link} to="/user">
      <ListItemIcon>
        <Person />
      </ListItemIcon>
      <ListItemText primary="User" />
    </ListItemButton>

    <ListItemButton component={Link} to="/board">
      <ListItemIcon>
        <ContentPaste />
      </ListItemIcon>
      <ListItemText primary="Board" />
    </ListItemButton>

    <ListItemButton component={Link} to="/course">
      <ListItemIcon>
        <AltRoute />
      </ListItemIcon>
      <ListItemText primary="Course" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>

  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <Assignment />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
