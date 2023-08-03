import React, { useState, useEffect } from "react";
import { Box, Paper, Typography, Checkbox, Grid, Button } from "@mui/material";
import ShortCountryList from "../../../Store/ShortCountryList";
import cities from "cities.json";
import City from "./City";
import { addCountries } from "../../../Store/ContactClice";
import { useSelector, useDispatch } from "react-redux";

import { editCountry, deleteCountry } from "../../../Store/CountryClice";

interface ManageCities {
  setManageCity: React.Dispatch<React.SetStateAction<boolean>>;
  setArrayIndex: React.Dispatch<React.SetStateAction<number>>;
  ArrayIndex: any;
}

function CitiesCheckbox({
  setManageCity,
  setArrayIndex,
  ArrayIndex,
}: ManageCities) {
  const dispatch = useDispatch();

  const data = useSelector((state: any) => {
    return state.countries;
  });

  const extractedArrays = data[ArrayIndex];

  const [citiesInCountry, setCitiesInCountry] = useState<
    Record<string, City[]>
  >({});
  const [selectedCities, setSelectedCities] = useState<
    Record<string, Record<number, boolean>>
  >({});
  const [initialSelectedCities, setInitialSelectedCities] = useState<
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

    if (ArrayIndex !== null) {
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
    }
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


 const [haschange, sethaschange] = useState(false);

 const handleCityChange = (
  countryCode: string,
  cityId: number,
  checked: boolean
) => {
  setSelectedCities((prevSelectedCities) => {
    // Check if the current city was previously selected
    const wasCitySelected = prevSelectedCities[countryCode]?.[cityId] || false;

    // Update the selected cities with the new value
    const updatedSelectedCities = {
      ...prevSelectedCities,
      [countryCode]: {
        ...(prevSelectedCities[countryCode] || {}),
        [cityId]: checked,
      },
    };

    // Check if any checkbox is still checked for the current countryCode
    let hasAnyCheckboxChecked = false;
    for (const cityId in updatedSelectedCities[countryCode]) {
      if (updatedSelectedCities[countryCode][cityId]) {
        hasAnyCheckboxChecked = true;
        break;
      }
    }

    // Update the haschange state based on the new city selection and checkboxes
    sethaschange(
      JSON.stringify(initialSelectedCities) !==
        JSON.stringify(updatedSelectedCities)
    );

    return updatedSelectedCities;
  });
};









  
  function addCountry() {
    if (ArrayIndex !== null) {
      const selectedCountriesData: { code: string; cities: number[] }[] = [];
      Object.entries(selectedCities).forEach(([countryCode, cityData]) => {
        const selectedCitiesIds = Object.entries(cityData)
          .filter(([cityId, checked]) => checked)
          .map(([cityId]) => parseInt(cityId));

        if (selectedCitiesIds.length > 0) {
          selectedCountriesData.push({
            code: countryCode,
            cities: selectedCitiesIds,
          });
        }
      });

      if (selectedCountriesData.length === 0) {
        // If no cities are selected for the country, delete the country data
        dispatch(deleteCountry(extractedArrays[ArrayIndex].id)); // Assuming 'id' is the identifier for the country data
      } else {
        // Replace the existing country arrays with the new data
        const updatedData = selectedCountriesData;

        // Dispatch action to update the Redux store with the new country data
        dispatch(editCountry({ index: ArrayIndex, country: updatedData }));
      }
    } else {
      const selectedCountriesData: { code: string; cities: number[] }[] = [];
      Object.entries(selectedCities).forEach(([countryCode, cityData]) => {
        const selectedCitiesIds = Object.entries(cityData)
          .filter(([cityId, checked]) => checked)
          .map(([cityId]) => parseInt(cityId));

        if (selectedCitiesIds.length > 0) {
          selectedCountriesData.push({
            code: countryCode,
            cities: selectedCitiesIds,
          });
        }
      });

      // Dispatch action to add new country arrays
      dispatch(addCountries(selectedCountriesData));
    }

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
    if (ArrayIndex !== null) {
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
      setInitialSelectedCities(initialSelectedCities)
      
    }

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
          <Button
            variant="outlined"
            onClick={addCountry}
            disabled={ArrayIndex !== null && !haschange}
          >
            {ArrayIndex === null ? "Add Data" : "Update Data"}
          </Button>
        </Grid>
      </Paper>
      <Grid></Grid>
    </Grid>
  );
}

export default CitiesCheckbox;
