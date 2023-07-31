import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import OurServices from "./OurServices";
import ShowServices from "./ShowServices";
import ContactForm from "./Contact/ContactForm";
import Field from "./Contact/Field";
import CitiesCheckbox from "./Contact/CitiesCheckbox";
import CountriesAccordion from "./Contact/CountriesAccordion";
import ManageCities from "./Contact/ManageCities";
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
      ) :
      
      SelectedComponent === "Company Information" ? (
        <>
          <ContactForm fields={fields} setFields={setFields} />
        </>
      ) :


      SelectedComponent === "Countries List" ? (
        <>
           {
          !ManageCity && (<ManageCities setManageCity={setManageCity} ></ManageCities>  )
        }
        {ManageCity && (
         <CitiesCheckbox setManageCity={setManageCity} ></CitiesCheckbox>
        )}
        </>
      ) :
      
      SelectedComponent === "Countries Accordion" ? (
        <>
          <CountriesAccordion></CountriesAccordion>
        </>
      ) :
      
      
      (
        <p>Invalid Component Selection</p>
      )}
    </Box>
  );
};

export default ContentContainer;
