import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Checkbox, Grid, Button } from "@mui/material";
import ShortCountryList from "../../../Store/ShortCountryList";
import cities from "cities.json";
import City from "./City";
import { addCountries } from "../../../Store/ContactClice";
import { useSelector, useDispatch } from "react-redux";

import { editCountry ,deleteCountry} from "../../../Store/CountryClice";

interface ManageCities {
  setManageCity: React.Dispatch<React.SetStateAction<boolean>>;
}

function CitiesCheckbox({ setManageCity }: ManageCities) {
  const dispatch = useDispatch();


  const data = useSelector((state: any) => {
    return state.countries;
  });
  const extractedArrays = data[1];
  console.log(extractedArrays)



  const [citiesInCountry, setCitiesInCountry] = useState<
    Record<string, City[]>
  >({});
  const [selectedCities, setSelectedCities] = useState<Record<string, Record<number, boolean>>>({});


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

    // Initialize selectedCities state based on data from Redux store
    const initialSelectedCities: Record<string, Record<number, boolean>> = {};
    extractedArrays.forEach((country: any) => {
      const countryCode = country.code;
      if (!initialSelectedCities[countryCode]) {
        initialSelectedCities[countryCode] = {};
      }
      country.cities.forEach((city: any) => {
        initialSelectedCities[countryCode][city.id] = true;
      });
    });
    setSelectedCities(initialSelectedCities);
  }, [data]);

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

  const handleCityChange = (countryCode: string, cityId: number, checked: boolean) => {
    setSelectedCities((prevSelectedCities: Record<string, Record<number, boolean>>) => {
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
  function addContact() {
    const selectedCountriesData: { code: string; cities: number[] }[] = [];

    // Loop through all selected countries and their cities
    Object.entries(selectedCities).forEach(([countryCode, cityData]) => {
      const selectedCitiesIds = Object.entries(cityData)
        .filter(([cityId, checked]) => checked)
        .map(([cityId]) => parseInt(cityId));

      if (selectedCitiesIds.length > 0) {
        selectedCountriesData.push({ code: countryCode, cities: selectedCitiesIds });
      }
    });

    // Dispatch action to update the Redux store with all selected countries and cities
    dispatch(addCountries(selectedCountriesData));

    setManageCity(false);
  }
  
  
  
  
  
  

  const [isLoading, setIsLoading] = useState(true);
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

    // Initialize selectedCities state based on data from 'data' object
    const initialSelectedCities: Record<string, Record<number, boolean>> = {};
    extractedArrays.forEach((country: any) => {
      const countryCode = country.code;
      if (!initialSelectedCities[countryCode]) {
        initialSelectedCities[countryCode] = {};
      }
      citiesForCountries[countryCode]?.forEach((city) => {
        initialSelectedCities[countryCode][city.id] = country.cities.includes(
          city.id
        );
      });
    });
    setSelectedCities(initialSelectedCities);

    setIsLoading(false); // Mark data loading as complete
  }, [data]);

  if (isLoading) {
    // Show loading state or spinner until data is ready
    return <div>Loading...</div>;
  }

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
