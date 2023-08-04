import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import cities from "cities.json";
import CountryList from "../../../Store/CountryList";
function CountriesAccordion() {
  const [citiesInCountry, setCitiesInCountry] = useState<
    Record<string, any[]> // Use "any" as the type for citiesInCountry
  >({});
  const [selectedCities, setSelectedCities] = useState<
    Record<string, Record<number, boolean>>
  >({});
  useEffect(() => {
    // Load cities data for all countries at the initial render
    const citiesForCountries: Record<string, any[]> = {}; // Use "any" as the type for citiesForCountries
    CountryList.slice(0, 40).forEach((data) => {
      // Get the first 20 countries from CountryList
      const citiesForCountry = (cities as any[]) // Use "any" as the type for cities array
        .filter((city) => city.country === data.code)
        .map((city, index) => ({ ...city, id: index + 1 }));
      citiesForCountries[data.code] = citiesForCountry;
    });
    setCitiesInCountry(citiesForCountries);
    setSelectedCities({});
  }, []);
  return (
    <Grid item sx={{ width: "80%" }}>
      <Paper elevation={3} sx={{ padding: "20px", marginBottom: "20px" }}>
        <Grid container direction="column" sx={{ width: "100%" }}>
          <Typography variant="h6">Countries Accordion</Typography>
          {CountryList.slice(0, 40).map((data) => (
            <Grid item key={data.code}>
              <Accordion sx={{ marginTop: "20px", marginBottom: "10px" }}>
                {/* Add marginBottom style above */}
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h6">{data.name}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ alignItems: "flex-start" }}>
                  {/* Add the align-items style above */}
                  <ul>
                    {citiesInCountry[data.code]?.slice(0, 60).map(
                      (
                        city: any // Use "any" as the type for city
                      ) => (
                        <li key={city.id}>
                          <Typography>{city.name}</Typography>
                        </li>
                      )
                    )}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
}

export default CountriesAccordion;
