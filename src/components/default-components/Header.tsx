import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
interface AppBarProps {
  open: boolean;
  handleDrawerToggle: () => void;
}
const CustomAppBar: React.FC<AppBarProps> = ({ open, handleDrawerToggle }) => {
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
          sx={{ mr: 2, display: "block" }} // Update the display property to 'block'
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          my-app Drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
