import React, { useState } from "react";
import CustomDrawer from "./default-components/Drawer";
import CustomAppBar from "./default-components/Header";
import ContentContainer from "./default-components/InnerBody";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
const Main: React.FC = () => {
  const [open, setOpen] = useState(false)
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const data = useSelector((state: any) => {
    return state.auth;
  });
  console.log(data)
  const [SelectedComponent, setSelectedComponent] = useState("Company Information");
  const theme = createTheme({
  });
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CustomAppBar open={open} handleDrawerToggle={handleDrawerToggle} SelectedComponent={SelectedComponent} />
        <CustomDrawer
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          setSelectedComponent={setSelectedComponent}
        />
        <ContentContainer open={open} SelectedComponent={SelectedComponent} />
      </Box>
    </ThemeProvider>
  );
};
export default Main;
