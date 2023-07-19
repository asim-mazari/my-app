import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import ContactBox from "./ContactBox";
import Field from "./Field";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  mobile: Yup.string().required("Mobile is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

interface ContactFormProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

function ContactForm({ fields, setFields }: ContactFormProps) {
  const [buttonClicked, setButtonClicked] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobile: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission if needed
    },
  });

  const handleAddField = () => {
    setButtonClicked(true);
    const isFieldsValid = fields.every((field) => {
      return (
        field.fullName.trim() !== "" &&
        field.mobile.trim() !== "" &&
        field.email.trim() !== ""
      );
    });
    if (isFieldsValid && formik.isValid) {
      let label;
      if (fields.length === 1) {
        label = "secondary";
      } else if (fields.length === 2) {
        label = "third";
      } else {
        label = "Additional info";
      }

      const newField: Field = {
        id: fields.length + 1,
        label: label,
        fullName: "",
        mobile: "",
        email: "",
      };

      setFields([...fields, newField]);
    }
  };

  function formdata() {
    fields.map((data) => {
      // form object off array
    });
  }

  return (
    <>
      <Box>
        <Typography variant="h5">Personal Info</Typography>
      </Box>
      <ContactBox fields={fields} setFields={setFields} formik={formik} buttonClicked={buttonClicked} />

      <Box
        sx={{
          width: "460px",
          padding: "20px",
          marginBottom: "20px",
          marginLeft: "26%",
        }}
      >
        <Grid container display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={formdata}>
            GET FORM DATA
          </Button>
          <Button variant="outlined" onClick={handleAddField}>
            Add More
          </Button>
        </Grid>
      </Box>
    </>
  );
}

export default ContactForm;
