import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import ShortCountryList from "../../../Store/ShortCountryList";
import cities from "cities.json";
import { SelectChangeEvent } from "@mui/material/Select";

interface City {
  country: string;
  name: string;
}
interface CitiesMap {
  [key: string]: City[];
}

function CitiesCheckbox() {
  const [citiesInCountry, setCitiesInCountry] = useState<CitiesMap>({});
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const handleCountryChange = (e: SelectChangeEvent<string>) => {
    const selectedCountryCode = e.target.value;
    setSelectedCountry(selectedCountryCode);

    const citiesForCountry = (cities as City[]).filter(
      (city) => city.country === selectedCountryCode
    );
    setCitiesInCountry({ [selectedCountryCode]: citiesForCountry });
    setSelectedCities([]);
  };

  const handleCityChange = (e: React.ChangeEvent<{ value: string }>) => {
    const selectedCity = e.target.value;
    setSelectedCities((prevCities) =>
      prevCities.includes(selectedCity)
        ? prevCities.filter((city) => city !== selectedCity)
        : [...prevCities, selectedCity]
    );
  };

  const MAX_CITIES = 40; // Set the maximum number of cities to show
  const handleSelectAll = () => {
    const allCityNames =
      citiesInCountry[selectedCountry]?.map((city) => city.name) || [];
    setSelectedCities(allCityNames);
  };

  const handleClearAll = () => {
    setSelectedCities([]);
  };

  return (
    <Grid item sx={{ width: "80%" }}>
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Grid sx={{ width: "100%" }}>
          <Grid item>
            <Typography variant="h6">Select Country</Typography>
            <FormControl sx={{ width: "300px", marginTop: "20px" }}>
              <InputLabel id="country-select-label">Select Country</InputLabel>
              <Select
                labelId="country-select-label"
                id="country-select"
                label="Select Country"
                value={selectedCountry}
                onChange={handleCountryChange}
              >
                {ShortCountryList.map((data) => (
                  <MenuItem key={data.code} value={data.code}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sx={{ marginTop: "50px" }}>
            <FormControl sx={{ width: "300px" }}>
              <Typography variant="h6">Select City</Typography>
              {/* Single checkbox to toggle between "Select All" and "Clear All" */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedCities.length > 0}
                    onChange={
                      selectedCities.length === 0
                        ? handleSelectAll
                        : handleClearAll
                    }
                  />
                }
                label={selectedCities.length === 0 ? "Select All" : "Clear All"}
              />

              {/* City checkboxes */}
              {citiesInCountry[selectedCountry]
                ?.slice(0, MAX_CITIES) // Limit the number of cities to the first 20
                .map((city) => (
                  <MenuItem key={city.name} value={city.name}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedCities.includes(city.name)}
                          onChange={handleCityChange}
                          value={city.name}
                        />
                      }
                      label={city.name}
                    />
                  </MenuItem>
                ))}
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <Grid></Grid>
    </Grid>
  );
}

export default CitiesCheckbox;
