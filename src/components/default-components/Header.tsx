import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

interface AppBarProps {
  open: boolean;
  handleDrawerToggle: () => void;
  SelectedComponent: any;
}

const CustomAppBar: React.FC<AppBarProps> = ({
  open,
  handleDrawerToggle,
  SelectedComponent,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: "width 225ms cubic-bezier(0.4, 0, 0.6, 1)",
        ...(open && { width: `calc(100% - ${240}px)` }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: 3,
            display: "block",
            borderRadius: "48%", // Set the borderRadius to '50%' to create a circular shape
             // Add a box shadow for the circular effect
          }}
        >
          {open ? <CloseIcon /> : <MenuIcon />} {/* Use the open prop to conditionally render the appropriate icon */}
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {SelectedComponent}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
