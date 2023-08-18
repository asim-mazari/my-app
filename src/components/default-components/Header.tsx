import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  MoreVert,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "../../Store/authSlice";

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
  const dispatch = useDispatch();
  const authData = useSelector((state: any) => state.auth);
  const { userId, userFirstName, userEmail, userlastName } =
    authData.auth || {};
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  console.log(userlastName);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(clearAuth());
  };

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
          {open ? <CloseIcon /> : <MenuIcon />}{" "}
          {/* Use the open prop to conditionally render the appropriate icon */}
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          {SelectedComponent}
        </Typography>
        <div style={{ marginLeft: "auto", display: "flex" }}>
          <Typography sx={{ marginRight: 2, marginTop: "7px" }}>
            {userFirstName && userlastName
              ? `${userFirstName} ${userlastName}`
              : ""}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="menu"
            aria-controls="menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MoreVert />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
