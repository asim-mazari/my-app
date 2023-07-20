import React, { useEffect } from "react";
import { Box, Paper, Typography, TextField, Button, Grid } from "@mui/material";
import Field from "./Field";
import {useSelector} from "react-redux"


interface ContactBoxProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  formik: any;
}

function ContactBox({ fields, setFields, formik }: ContactBoxProps) {
 


  
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

  return (
   <Grid >
    <Grid item>
        {fields.map((field, index) => (
          <Paper
            elevation={3}
            sx={{ width: "460px", padding: "20px", marginBottom: "20px" }}
            key={field.id}
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
          </Paper>
        ))}

        <Grid></Grid>
      </Grid>
   </Grid>
  );
}
export default ContactBox;
