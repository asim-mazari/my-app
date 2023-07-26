import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import ContactBox from "./ContactBox";
import Field from "./Field";
import { useFormik } from "formik";
import * as Yup from "yup";
import ContactData from "./ContactData";
import { useDispatch } from "react-redux";
import { addContact, editContact } from "../../../Store/ContactClice";
import { useSelector } from "react-redux";

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
  const dispatch = useDispatch();

  
  const formik = useFormik({
    initialValues: {
      fullName: "",
      mobile: "",
      email: "",
      address: "",
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
        field.email.trim() !== "" &&
        field.address.trim() !== ""
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
        address: "",
        selectedCountry:"",
        selectedCity: "",
      };

      setFields([...fields, newField]);
    }
  };

  const contacts = useSelector((state: any) => {
    return state.users;
  });
  function formdata() {
    
    fields.forEach((data) => {
      if (
        data.fullName.trim() !== "" &&
        data.mobile.trim() !== "" &&
        data.email.trim() !== "" &&
        data.selectedCountry?.trim() !== "" &&
        data.selectedCity?.trim() !== ""
      ) {
  
        // Move findContactById inside the formdata function and pass contacts as an argument
        const existingContact = findContactById(data.id, contacts);
        console.log("Existing contact:", existingContact); // Check the existing contact in the console

        // Check if both selectedCountry and selectedCity are not empty
        if (data.selectedCountry && data.selectedCity) {
          if (existingContact) {
            // If a contact with the same id exists, update it
            dispatch(editContact(data)); // Dispatch the action with the updated data
            setAddInfo(false);
          } else {
            // If a contact with the same id doesn't exist, add it
            dispatch(addContact(data)); // Assuming you have defined the 'addContact' action in the Redux slice
                  setAddInfo(false);
          }
        } else {
          console.log("Selected country or city is empty, skipping...");
        }
      }
    });
  }

  function findContactById(id: number, contacts: any[]) {
    return contacts.find((contact: any) => contact.id === id);
  }
  const [editUserData, setEditUserData] = useState<any>(null);
  const [AddInfo, setAddInfo] = useState(false);
  // Callback function to handle editing
  const handleEditUser = (user: any) => {
    setEditUserData(user);
  };

  return (
    <>
      <Box>
      <Grid display="flex" justifyContent="space-between">

        {
          !AddInfo && (  <ContactData
            onEdit={handleEditUser}
            setAddInfo={setAddInfo}
          ></ContactData>)
        }
        {AddInfo && (
          <ContactBox
            fields={fields}
            setFields={setFields}
            formik={formik}
            editUserData={editUserData}
            onEdit={handleEditUser}
          />
        )}
      </Grid>

      <Grid container display="flex" justifyContent="center" width='100%'>
      {AddInfo && (
              <Grid sx={{width:'70%'}} display="flex" justifyContent="space-between">


                <Button variant="outlined" onClick={formdata}>
                  Submit
                </Button>
                <Button variant="outlined" onClick={handleAddField}>
                  Add More
                </Button>
              </Grid>
            )}
        </Grid>
      </Box>
    
     
    </>
  );
}

export default ContactForm;
