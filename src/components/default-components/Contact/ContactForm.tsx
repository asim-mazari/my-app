import React, { useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import ContactBox from "./ContactBox";
import Field from "./Field";
import { useFormik } from "formik";
import * as Yup from "yup";
import ContactData from "./ContactData";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  mobile: Yup.string().required("Mobile is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});
interface ContactFormProps {
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
}

function ContactForm({ fields, setFields }: ContactFormProps) {

  const [showTable, setShowTable] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobile: "",
      email: "",
      address:""
      
    },
    validationSchema,
    onSubmit: (values) => {
      // Handle form submission if needed
    },
  });

  const handleAddField = () => {
    const isFieldsValid = fields.every((field) => {
      return (
        field.fullName.trim() !== "" &&
        field.mobile.trim() !== "" &&
        field.email.trim() !== ""&&
        field.address.trim() !==""
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
        address:""
      };

      setFields([...fields, newField]);
    }
  };

  function formdata() {
    setShowTable(true);
  }

  return (
    <>
      <Box>
        <Typography variant="h5">Personal Info</Typography>
      </Box>
      <Grid  display="flex" justifyContent="space-between" sx={{width:'100%'}}>
        {showTable && <ContactData fields={fields} setFields={setFields}></ContactData>}
      <ContactBox fields={fields} setFields={setFields} formik={formik} />
      </Grid>
      

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
