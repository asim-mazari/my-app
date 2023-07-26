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
import CountryList from "../../../Store/CountryList";
import { loadState, saveState } from "./../../../Store/localStorage";
import { useSelector } from "react-redux";

interface ContactBoxProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  formik: any;
  editUserData: any; // Add the editUserData prop
  onEdit: (user: any) => void;
}

interface City {
  country: string;
  name: string;
}
interface CitiesMap {
  [key: string]: City[];
}

function ContactBox({
  fields,
  setFields,
  formik,
  editUserData,
  onEdit,
}: ContactBoxProps) {
  const data = useSelector((state: any) => {
    return state.users;
  });

  useEffect(() => {
    // Map the data objects to Field objects and set the fields state
    const mappedFields = data.map((d: any) => ({
      id: d.id,
      label: d.label,
      fullName: d.fullName,
      mobile: d.mobile,
      email: d.email,
      address: d.address,
      selectedCountry: d.selectedCountry,
      selectedCity: d.selectedCity,
      // Add other properties as needed
    }));
    setFields(mappedFields);
  }, [data]);

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

  // State to store the selected country code

  // Function to handle country selection
  const [citiesInCountry, setCitiesInCountry] = useState<{
    [key: string]: any[];
  }>({}); // Initialize as an empty object

  useEffect(() => {
    const initialCities: CitiesMap = {}; // Use the CitiesMap type here
    fields.forEach((field) => {
      const citiesForCountry = (cities as City[]).filter(
        (city) => city.country === field.selectedCountry
      );
      initialCities[field.id] = citiesForCountry;
    });
    setCitiesInCountry(initialCities);
  }, []);

  const handleCountryChange = (
    e: React.ChangeEvent<{ value: string }>,
    field: Field
  ) => {
    const selectedCountryCode = e.target.value;

    const updatedFields = fields.map((f) => {
      if (f.id === field.id) {
        return {
          ...f,
          selectedCountry: selectedCountryCode,
          selectedCity: "", // Reset the selected city when the country changes
        };
      }
      return f;
    });
    setFields(updatedFields);

    const citiesForCountry = (cities as City[]).filter(
      (city) => city.country === selectedCountryCode
    );

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
    <Grid display="flex" sx={{ width: "100%" }} justifyContent="center">
      <Grid item sx={{ width: "80%" }}>
        {fields.map((field, index) => (
          <Paper
            elevation={3}
            sx={{ padding: "20px", marginBottom: "20px" }}
            key={field.id}
            ref={editUserData?.id === field.id ? formRef : null}
          >
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
              {field.label}
            </Typography>
            <TextField
              label="Full Name"
              variant="outlined"
              value={field.fullName}
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
                <FormControl sx={{ width: "300px" }}>
                  <InputLabel id="country-select-label">
                    Select Country
                  </InputLabel>
                  <Select
                    labelId="country-select-label"
                    id="country-select"
                    label="Select Country"
                    value={field.selectedCountry}
                    onChange={(e: any) => handleCountryChange(e, field)} // Create a function to handle country selection
                  >
                    {CountryList.map((data) => (
                      <MenuItem value={data.code}>{data.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl sx={{ width: "300px" }}>
                  <InputLabel id="city-select-label">Select City</InputLabel>
                  <Select
                    labelId="city-select-label"
                    id="city-select"
                    value={field.selectedCity}
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
