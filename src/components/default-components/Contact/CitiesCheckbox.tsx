import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Checkbox, Grid } from "@mui/material";

import ShortCountryList from "../../../Store/ShortCountryList";
import cities from "cities.json";

interface City {
  id: number;
  country: string;
  name: string;
  lat: string;
  lng: string;
}

function CitiesCheckbox() {
  const [citiesInCountry, setCitiesInCountry] = useState<
    Record<string, City[]>
  >({});
  const [selectedCities, setSelectedCities] = useState<
    Record<string, Record<number, boolean>>
  >({});

  useEffect(() => {
    // Load cities data for all countries at the initial render
    const citiesForCountries: Record<string, City[]> = {};
    ShortCountryList.forEach((data) => {
      const citiesForCountry = (cities as City[])
        .filter((city) => city.country === data.code)
        .map((city, index) => ({ ...city, id: index + 1 }));
      citiesForCountries[data.code] = citiesForCountry;
    });
    setCitiesInCountry(citiesForCountries);
    setSelectedCities({});
  }, []);

  const MAX_CITIES = 40;

  const handleToggleAll = (countryCode: string) => {
    const citiesToToggle =
      citiesInCountry[countryCode]?.map((city) => city.id) || [];
    setSelectedCities((prevSelectedCities) => {
      const allSelected = citiesToToggle.every(
        (cityId) => prevSelectedCities[countryCode]?.[cityId]
      );
      const updatedSelectedCities: Record<number, boolean> = {};
      citiesToToggle.forEach((cityId) => {
        updatedSelectedCities[cityId] = !allSelected;
      });
      return {
        ...prevSelectedCities,
        [countryCode]: {
          ...prevSelectedCities[countryCode],
          ...updatedSelectedCities,
        },
      };
    });
  };

  const handleCityChange = (
    countryCode: string,
    cityId: number,
    checked: boolean
  ) => {
    setSelectedCities((prevSelectedCities) => ({
      ...prevSelectedCities,
      [countryCode]: {
        ...prevSelectedCities[countryCode],
        [cityId]: checked,
      },
    }));
  };

  const handleSelectAll = () => {
    const allCitiesSelected = ShortCountryList.every((data) =>
      citiesInCountry[data.code]?.every(
        (city) => selectedCities[data.code]?.[city.id]
      )
    );
    const updatedSelectedCities: Record<string, Record<number, boolean>> = {};
    ShortCountryList.forEach((data) => {
      const citiesToToggle =
        citiesInCountry[data.code]?.map((city) => city.id) || [];

      const updatedCities: Record<number, boolean> = {};
      citiesToToggle.forEach((cityId) => {
        updatedCities[cityId] = !allCitiesSelected;
      });

      updatedSelectedCities[data.code] = {
        ...(selectedCities[data.code] || {}),
        ...updatedCities,
      };
    });

    setSelectedCities((prevSelectedCities) => ({
      ...prevSelectedCities,
      ...updatedSelectedCities,
    }));
  };
  return (
    <Grid item sx={{ width: "80%" }}>
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Grid container direction="column" sx={{ width: "100%" }}>
          <Grid item display="flex" alignItems="center">
            <Checkbox
              checked={ShortCountryList.every(
                (data) =>
                  citiesInCountry[data.code]?.every(
                    (city) => selectedCities[data.code]?.[city.id]
                  ) || false
              )}
              onChange={handleSelectAll}
            />
            <Typography variant="h6">Countries List</Typography>
          </Grid>
          <Grid item container sx={{ marginTop: "20px" }}>
            <Grid item xs={6}>
              {ShortCountryList.map((data, index) => {
                if (index % 2 === 0) {
                  return (
                    <React.Fragment key={data.code}>
                      <Grid container alignItems="center">
                        <Checkbox
                          checked={
                            citiesInCountry[data.code]?.every(
                              (city) => selectedCities[data.code]?.[city.id]
                            ) || false
                          }
                          onChange={() => handleToggleAll(data.code)}
                        />
                        <Typography variant="h6">{data.name}</Typography>
                      </Grid>
                      <ul>
                        {citiesInCountry[data.code]
                          ?.slice(0, MAX_CITIES)
                          .map((city) => (
                            <li key={city.id}>
                              <Grid container alignItems="center">
                                <Checkbox
                                  checked={
                                    selectedCities[data.code]?.[city.id] ||
                                    false
                                  }
                                  onChange={(e) =>
                                    handleCityChange(
                                      data.code,
                                      city.id,
                                      e.target.checked
                                    )
                                  }
                                />
                                <span>{city.name}</span>
                              </Grid>
                            </li>
                          ))}
                      </ul>
                      <Box sx={{ borderBottom: "1px solid #ccc", my: 2 }} />
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </Grid>
            <Grid item xs={6}>
              {ShortCountryList.map((data, index) => {
                if (index % 2 === 1) {
                  return (
                    <React.Fragment key={data.code}>
                      <Grid container alignItems="center">
                        <Checkbox
                          checked={
                            citiesInCountry[data.code]?.every(
                              (city) => selectedCities[data.code]?.[city.id]
                            ) || false
                          }
                          onChange={() => handleToggleAll(data.code)}
                        />
                        <Typography variant="h6">{data.name}</Typography>
                      </Grid>
                      <ul>
                        {citiesInCountry[data.code]
                          ?.slice(0, MAX_CITIES)
                          .map((city) => (
                            <li key={city.id}>
                              <Grid container alignItems="center">
                                <Checkbox
                                  checked={
                                    selectedCities[data.code]?.[city.id] ||
                                    false
                                  }
                                  onChange={(e) =>
                                    handleCityChange(
                                      data.code,
                                      city.id,
                                      e.target.checked
                                    )
                                  }
                                />
                                <span>{city.name}</span>
                              </Grid>
                            </li>
                          ))}
                      </ul>
                      <Box sx={{ borderBottom: "1px solid #ccc", my: 2 }} />
                    </React.Fragment>
                  );
                }
                return null;
              })}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Grid></Grid>
    </Grid>
  );
}

export default CitiesCheckbox;
