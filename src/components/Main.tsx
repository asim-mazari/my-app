import React, { useState } from "react";
import CustomDrawer from "./default-components/Drawer";
import CustomAppBar from "./default-components/Header";
import ContentContainer from "./default-components/InnerBody";
import { Box, ThemeProvider, createTheme } from "@mui/material";

const Main: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const [SelectedComponent, setSelectedComponent] = useState("Company Information");
  const handleServicesClick = () => {
    setShowServices(true);
  };



  const handleCompanyInfoClick = () => {
    setShowServices(false);
  };

  const theme = createTheme({
    // Define your theme configurations here
  });

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <CustomAppBar open={open} handleDrawerToggle={handleDrawerToggle} SelectedComponent={SelectedComponent} />
        <CustomDrawer
          open={open}
          handleDrawerToggle={handleDrawerToggle}
          handleServicesClick={handleServicesClick}
          handleCompanyInfoClick={handleCompanyInfoClick}
          setSelectedComponent={setSelectedComponent}
         

        />
        <ContentContainer open={open} showServices={showServices} />
      </Box>
    </ThemeProvider>
  );
};

export default Main;
