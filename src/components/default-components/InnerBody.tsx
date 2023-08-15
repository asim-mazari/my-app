import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import OurServices from "./OurServices";
import ShowServices from "./ShowServices";
import ContactForm from "./Contact/ContactForm";
import Field from "./Contact/Field";
import CitiesCheckbox from "./CountriesData/CitiesCheckbox";
import CountriesAccordion from "./CountriesData/CountriesAccordion";
import ManageCities from "./CountriesData/ManageCities";
import Gallery from "./Gallery/Gallery";
import ManageGallery from "./Gallery/ManageGallery";
import RegisterUser from "./Auth/RegisterUser";
import LoginUser from "./Auth/LoginUser";
interface ContentContainerProps {
  open: boolean;
  SelectedComponent: any;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  open,
  SelectedComponent,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [fields, setFields] = useState<Field[]>([
    {
      id: 1,
      label: "primary",
      fullName: "",
      mobile: "",
      email: "",
      address: "",
      selectedCountry: "",
      selectedCity: "",
    },
  ]);

  const handleSelectedServicesChange = (services: string[]) => {
    setSelectedServices(services);
  };
  const [ManageCity, setManageCity] = useState(false);
  const [ArrayIndex, setArrayIndex] = useState(0);
  const [Managegallery, setManagegallery] = useState(false);
  const [GalleryIndex, setGalleryIndex] = useState(0);
  const [Register_User, setRegister_User] = useState(false);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: open ? `calc(97% - ${220}px)` : "97%",
        marginLeft: open ? `${220}px` : 0,
        transition: "width 0.3s, margin-left 0.3s",
      }}
    >
      <Toolbar />

      {SelectedComponent === "Services" ? (
        <>
          <OurServices
            selectedServices={selectedServices}
            onSelectedServicesChange={handleSelectedServicesChange}
          />
          <ShowServices selectedServices={selectedServices} />
        </>
      ) : SelectedComponent === "Company Information" ? (
        <>
          <ContactForm fields={fields} setFields={setFields} />
        </>
      ) : SelectedComponent === "Countries List" ? (
        <>
          {!ManageCity && (
            <ManageCities
              setManageCity={setManageCity}
              setArrayIndex={setArrayIndex}
            ></ManageCities>
          )}
          {ManageCity && (
            <CitiesCheckbox
              setManageCity={setManageCity}
              setArrayIndex={setArrayIndex}
              ArrayIndex={ArrayIndex}
            ></CitiesCheckbox>
          )}
        </>
      ) : SelectedComponent === "Countries Accordion" ? (
        <>
          <CountriesAccordion></CountriesAccordion>
        </>
      ) : SelectedComponent === "Gallery" ? (
        <>
          {!Managegallery && (
            <ManageGallery
              setManagegallery={setManagegallery}
              setGalleryIndex={setGalleryIndex}
            ></ManageGallery>
          )}

          {Managegallery && (
            <Gallery
              setManagegallery={setManagegallery}
              setGalleryIndex={setGalleryIndex}
              GalleryIndex={GalleryIndex}
            ></Gallery>
          )}
        </>
      ) : SelectedComponent === "Register" ? (
        <>
          {Register_User && (
            <RegisterUser setRegister_User={setRegister_User}></RegisterUser>
          )}
          {!Register_User && (
            <LoginUser setRegister_User={setRegister_User}></LoginUser>
          )}
        </>
      ) : (
        <p>Invalid Component Selection</p>
      )}
    </Box>
  );
};

export default ContentContainer;
