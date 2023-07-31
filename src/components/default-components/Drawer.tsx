import React, { useState } from "react";
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Settings as ServiceIcon,
  Person as PersonIcon,
  Language as WorldIcon,
} from "@mui/icons-material";

interface DrawerProps {
  open: boolean;
  handleDrawerToggle: () => void;
  setSelectedComponent: (user: any) => void;
}
const drawerWidth = 240;
const CustomDrawer: React.FC<DrawerProps> = ({
  open,
  handleDrawerToggle,
  setSelectedComponent,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(
    "Company Information"
  );

  const handleListItemClick = (itemKey: string) => {
    setSelectedItem(itemKey);
    setSelectedComponent(itemKey);
  };

  return (
    <>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar></Toolbar>
        <Divider />
        <List>
          <ListItem
            button
            key="Services"
            disablePadding
            onClick={() => {
              handleListItemClick("Services");
            }}
            sx={{
              backgroundColor: selectedItem === "Services" ? "#e0e0e0" : "",
            }}
          >
            <ListItemIcon>
              <ServiceIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItem>

          <ListItem
            button
            key="Company Information"
            disablePadding
            onClick={() => {
              handleListItemClick("Company Information");
            }}
            sx={{
              backgroundColor:
                selectedItem === "Company Information" ? "#e0e0e0" : "",
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Company Information" />
          </ListItem>

          <ListItem
            button
            key="Countries List"
            disablePadding
            onClick={() => {
              handleListItemClick("Countries List");
            }}
            sx={{
              backgroundColor:
                selectedItem === "Countries List" ? "#e0e0e0" : "",
            }}
          >
            <ListItemIcon>
              <WorldIcon />
            </ListItemIcon>
            <ListItemText primary="Countries List" />
          </ListItem>

          <ListItem
            button
            key="Countries Accordion"
            disablePadding
            onClick={() => {
              handleListItemClick("Countries Accordion");
            }}
            sx={{
              backgroundColor:
                selectedItem === "Countries Accordion" ? "#e0e0e0" : "",
            }}
          >
            <ListItemIcon>
              <WorldIcon />
            </ListItemIcon>
            <ListItemText primary="Countries Accordion" />
          </ListItem>
          {/* ...other list items */}
        </List>
        {/* ...other lists */}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
