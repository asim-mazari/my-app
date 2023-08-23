import React, { useState, useEffect } from "react";
import CustomDrawer from "./default-components/Drawer";
import CustomAppBar from "./default-components/Header";
import ContentContainer from "./default-components/InnerBody";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuth } from "../Store/authSlice";
import { checkTokenValidation } from "../Store/tokenSlice";

function Main() {
  const [open, setOpen] = useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch();
  const authData = useSelector((state: any) => state.auth);
  const { token } = authData.auth || {};
  useEffect(() => {
    const trackToken = async () => {
      const tokenObject = { token: token };
      const tokenResponce = await dispatch(
        checkTokenValidation(tokenObject) as any
      );
      if (!tokenResponce.payload) {
        alert("Token Expire Login please");
        dispatch(clearAuth());
        navigate("/login");
      }
    };
    // Attach the event listener when the component mounts
    document.addEventListener("click", trackToken);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", trackToken);
    };
  }, []);

  const [SelectedComponent, setSelectedComponent] = useState(
    "Company Information"
  );

  const theme = createTheme({});
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CustomAppBar
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          SelectedComponent={SelectedComponent}
        />
        <CustomDrawer
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          setSelectedComponent={setSelectedComponent}
        />
        <ContentContainer open={open} SelectedComponent={SelectedComponent} />
      </Box>
    </ThemeProvider>
  );
}
export default Main;
