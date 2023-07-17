import React from "react";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  SelectChangeEvent,
} from "@mui/material";

interface OurServicesProps {
  selectedServices: string[];
  onSelectedServicesChange: (services: string[]) => void;
}
const theme = createTheme();
const OurServices: React.FC<OurServicesProps> = ({
  selectedServices,
  onSelectedServicesChange,
}) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    onSelectedServicesChange(event.target.value as string[]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Services</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            multiple
            value={selectedServices}
            label="Services"
            onChange={handleChange}
            renderValue={(selected) => (selected as string[]).join(", ")}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="service1">
              <Checkbox checked={selectedServices.indexOf("service1") > -1} />
              Service 1
            </MenuItem>
            <MenuItem value="service2">
              <Checkbox checked={selectedServices.indexOf("service2") > -1} />
              Service 2
            </MenuItem>
            <MenuItem value="service3">
              <Checkbox checked={selectedServices.indexOf("service3") > -1} />
              Service 3
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};

export default OurServices;
