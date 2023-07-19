import React from "react";
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
  Person as PersonIcon
} from "@mui/icons-material";

interface DrawerProps {
  open: boolean;
  handleDrawerToggle: () => void;
  handleServicesClick: () => void;
  handleCompanyInfoClick: () => void;
}

const drawerWidth = 240;

const CustomDrawer: React.FC<DrawerProps> = ({
  open,
  handleDrawerToggle,
  handleServicesClick,
  handleCompanyInfoClick,
}) => {
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
        <Toolbar />
        <Divider />
        <List>
          <ListItem
            button
            key="Services"
            disablePadding
            onClick={handleServicesClick}
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
            onClick={handleCompanyInfoClick}
          >


            
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Company Information" />
          </ListItem>
          {/* ...other list items */}
        </List>
        {/* ...other lists */}
      </Drawer>
    </>
  );
};

export default CustomDrawer;
