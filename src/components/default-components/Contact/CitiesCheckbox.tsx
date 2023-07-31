import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Checkbox, Grid, Button } from "@mui/material";
import ShortCountryList from "../../../Store/ShortCountryList";
import cities from "cities.json";
import City from "./City";
import { addCountries } from "../../../Store/ContactClice";
import { useSelector, useDispatch } from "react-redux";

import { editCountry } from "../../../Store/CountryClice";
interface ManageCities {
  setManageCity: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CountryData {
  id: number;
  countryCode: string;
  cities: number[];
}
function CitiesCheckbox({ setManageCity }: ManageCities) {
  const [updatedSelectedCities, setUpdatedSelectedCities] = useState<
    Record<string, Record<number, boolean>>
  >({});

  const dispatch = useDispatch();
  const [countryData, setCountryData] = useState<CountryData[]>([]);
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

  const MAX_CITIES = 40;

  useEffect(() => {
    // Load cities data for all countries at the initial render
    const citiesForCountries: Record<string, City[]> = {};
    ShortCountryList.forEach((data) => {
      const citiesForCountry = (cities as City[])
        .filter((city) => city.country === data.code)
        .map((city, index) => ({ ...city, id: index + 1 }));
      citiesForCountries[data.code] = citiesForCountry;
    });
    setCountryData(
      ShortCountryList.map((data) => ({
        id: 0, // Assign a unique ID or use index + 1, if you want
        countryCode: data.code,
        cities: [],
      }))
    );
  }, []);

  

  const handleCityChange = (
    countryCode: string,
    cityId: number,
    checked: boolean
  ) => {
    setSelectedCities((prevSelectedCities) => {
      const updatedSelectedCities = {
        ...prevSelectedCities,
        [countryCode]: {
          ...(prevSelectedCities[countryCode] || {}),
          [cityId]: checked,
        },
      };
      return updatedSelectedCities;
    });
  };
  const data = useSelector((state: any) => {
    return state.countries;
  });

  useEffect(() => {
    setCountryData(data.map((country: any) => ({
      id: country.id,
      countryCode: country.code,
      cities: country.cities.map((city: any) => city.id),
    })));
  }, [data]);

  // ...

  function addContact() {
    const selectedCountriesData: Record<
      string,
      { id: number; city: string }[]
    > = {};

    // Extract the selected cities for each country and add them to the selectedCountriesData object
    Object.entries(selectedCities).forEach(([countryCode, cityData]) => {
      selectedCountriesData[countryCode] = Object.entries(cityData)
        .filter(([cityId, checked]) => checked)
        .map(([cityId]) => ({
          id: parseInt(cityId),
          city:
            citiesInCountry[countryCode]?.find(
              (city) => city.id === parseInt(cityId)
            )?.name || "",
        }));
    });

    // Check if the data for each country already exists in the state
    Object.entries(selectedCountriesData).forEach(([countryCode, cities]) => {
      const existingCountry = data.find((country: any) => country.code === countryCode);
      if (existingCountry) {
        // Country with the same code already exists, update its cities in the Redux store
        const updatedCountry = {
          ...existingCountry,
          cities: cities.map(city => ({ id: city.id })), // Convert city objects to {id} format as in the Redux store
        };
        dispatch(editCountry(updatedCountry)); // Correct the action creator name to 'editCountry'
      } else {
        // Country with the code does not exist, add a new entry to the Redux store
        dispatch(addCountries({ code: countryCode, cities: cities.map(city => ({ id: city.id })) }));
      }
    });

    setManageCity(false);
  }

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
  const initialSelectedCities: Record<string, Record<number, boolean>> = {};
  data.forEach((country: any) => {
    const countryCode = country.code;
    if (!initialSelectedCities[countryCode]) {
      initialSelectedCities[countryCode] = {};
    }
    country.cities.forEach((city: any) => {
      initialSelectedCities[countryCode][city.id] = true;
    });
  });
  setSelectedCities(initialSelectedCities);
}, []);

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
            <Grid item xs={4}>
              {ShortCountryList.map((data, index) => {
                if (index % 3 === 0) {
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
            <Grid item xs={4}>
              {ShortCountryList.map((data, index) => {
                if (index % 3 === 1) {
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
            <Grid item xs={4}>
              {ShortCountryList.map((data, index) => {
                if (index % 3 === 2) {
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
          <Button variant="outlined" onClick={addContact}>
            SUBMIT
          </Button>
        </Grid>
      </Paper>
      <Grid></Grid>
    </Grid>
  );
}

export default CitiesCheckbox;
