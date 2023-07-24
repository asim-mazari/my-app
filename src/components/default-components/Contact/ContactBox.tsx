import React, { useEffect, useState, useRef } from "react";
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
} from "@mui/material";
import Field from "./Field";
import cities from "cities.json";

interface ContactBoxProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  formik: any;
  editUserData: any; // Add the editUserData prop
  onEdit: (user: any) => void;
}

function ContactBox({
  fields,
  setFields,
  formik,
  editUserData,
  onEdit,
}: ContactBoxProps) {
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: Field
  ) => {
    const { name, value } = e.target;
    const updatedFields = fields.map((f) => {
      if (f.id === field.id) {
        return {
          ...f,
          [name]: value,
        };
      }
      return f;
    });
    setFields(updatedFields);
  };

  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if editUserData exists and if the formRef has been set (i.e., the form has been rendered)
    if (editUserData && formRef.current) {
      // Scroll to the form with the same ID as the editUserData
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [editUserData]);

  onEdit(null);

  const [countries, setCountries] = useState<{ code: string; name: string }[]>(
    []
  ); // Add type annotation for countries

  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(""); // State to store the selected country code

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v2/all");
        const data = await response.json();
        const countriesData = data.map((country: any) => ({
          code: country.alpha2Code,
          name: country.name,
        }));
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
  
    // Check if the countries are already fetched before making the API call
    if (countries.length === 0) {
      fetchCountries();
    }
  }, [countries]);

  // Function to handle country selection
  const [citiesInCountry, setCitiesInCountry] = useState<{
    [key: string]: any[];
  }>({}); // Initialize as an empty object
  const handleCountryChange = (
    e: React.ChangeEvent<{ value: string }>,
    field: Field
  ) => {
    const selectedCountryCode = e.target.value;
    setSelectedCountryCode(selectedCountryCode); // Update the selected country code in the state

    // Find the selected country name based on the selected country code
    const selectedCountryName = countries.find(
      (country) => country.code === selectedCountryCode
    )?.name;

    // Update the selected country name and selected city in the 'field' object
    const updatedFields = fields.map((f) => {
      if (f.id === field.id) {
        return {
          ...f,
          selectedCountry: selectedCountryName || "", // Update the selected country name in the field object
          selectedCity: "", // Reset the selected city when the country changes
        };
      }
      return f;
    });
    setFields(updatedFields);

    // Filter the cities for the selected country and set them for the specific field
    const citiesForCountry = (cities as any[]).filter(
      (city: any) => city.country === selectedCountryCode
    );

    // Use the field's ID as a key to store the cities for each field separately
    setCitiesInCountry((prevCities) => ({
      ...prevCities,
      [field.id]: citiesForCountry,
    }));
  };

  // Function to handle city selection
  const handleCityChange = (
    e: React.ChangeEvent<{ value: string }>,
    field: Field
  ) => {
    const selectedCity = e.target.value;
    // Update the selected city for the specific field
    const updatedFields = fields.map((f) => {
      if (f.id === field.id) {
        return {
          ...f,
          selectedCity: selectedCity || "", // Reset the selected city when the country changes
        };
      }
      return f;
    });
    setFields(updatedFields);
  };

  return (
    <Grid>
      <Grid item>
        {fields.map((field, index) => (
          <Paper
            elevation={3}
            sx={{ width: "460px", padding: "20px", marginBottom: "20px" }}
            key={field.id}
            ref={editUserData?.id === field.id ? formRef : null}
          >
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              {field.label}
            </Typography>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              name="fullName"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.handleChange(e);
                handleFieldChange(e, field);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.fullName &&
                !!formik.errors.fullName &&
                field.fullName.trim() === ""
              }
              helperText={formik.touched.fullName && formik.errors.fullName}
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              label="Mobile"
              variant="outlined"
              fullWidth
              name="mobile"
              type="tel"
              inputProps={{ pattern: "[0-9]*" }}
              value={field.mobile}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { value } = e.target;
                const isNumber = /^\d*$/.test(value); // Check if the value is a number
                if (isNumber) {
                  formik.handleChange(e);
                  handleFieldChange(e, field);
                }
              }}
              onBlur={formik.handleBlur}
              error={
                (formik.touched.mobile && !!formik.errors.mobile) ||
                (!!field.mobile && !/^\d*$/.test(field.mobile)) // Check if the value is a string
              }
              helperText={
                (formik.touched.mobile && formik.errors.mobile) ||
                (!!field.mobile &&
                  !/^\d*$/.test(field.mobile) &&
                  "Please enter numbers only")
              }
              sx={{ marginBottom: "20px" }}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={field.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.handleChange(e);
                handleFieldChange(e, field);
              }}
              onBlur={formik.handleBlur}
              error={
                formik.touched.email &&
                !!formik.errors.email &&
                field.email.trim() === ""
              }
              helperText={formik.touched.email && formik.errors.email}
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              label="Address"
              variant="outlined"
              fullWidth
              name="address"
              value={field.address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                formik.handleChange(e);
                handleFieldChange(e, field);
              }}
              sx={{ marginBottom: "20px" }}
            />

            <Grid
              container
              display="flex"
              justifyContent="space-between"
              sx={{ width: "100%" }}
            >
              <Grid item>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel id="country-select-label">
                    Select Country
                  </InputLabel>
                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    value={field.selectedCountry} // You need to have a selectedCountry property in the 'field' object to store the selected country
                    label="Select Country"
                    onChange={(e: any) => handleCountryChange(e, field)} // Create a function to handle country selection
                  >
                    {countries.map((country) => (
                      <MenuItem key={country.code} value={country.code}>
                        {country.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl sx={{ width: "200px" }}>
                  <InputLabel id="city-select-label">Select City</InputLabel>
                  <Select
                    labelId="city-select-label"
                    id="city-select"
                    value={field.selectedCity} // You need to have a selectedCity property in the 'field' object to store the selected city
                    label="Select City"
                    onChange={(e: any) => handleCityChange(e, field)} // Create a function to handle city selection
                  >
                    {citiesInCountry[field.id]?.map((city) => (
                      <MenuItem key={city.name} value={city.name}>
                        {city.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        ))}

        <Grid></Grid>
      </Grid>
    </Grid>
  );
}
export default ContactBox;
