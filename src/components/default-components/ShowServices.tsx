import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { Typography } from "@mui/material";

interface ShowServicesProps {
  selectedServices: string[];
}
const theme = createTheme();
{
}

const ShowServices: React.FC<ShowServicesProps> = ({ selectedServices }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" justifyContent="center">
        <Box>
          <Typography variant="h5"> Selected Services</Typography>
          <List>
            {selectedServices.map((service) => (
              <ListItem key={service}>
                <ListItemText primary={service} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ShowServices;
