import React, { useState } from "react";
import { Box, Toolbar } from "@mui/material";
import OurServices from "./OurServices";
import ShowServices from "./ShowServices";
import ContactForm from "./Contact/ContactForm";
import Field from "./Contact/Field";

interface ContentContainerProps {
  open: boolean;
  showServices: boolean;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  open,
  showServices,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [fields, setFields] = useState<Field[]>([
    {
      id: 1,
      label: "primary",
      fullName: "",
      mobile: "",
      email: "",
    },
  ]);

  const handleSelectedServicesChange = (services: string[]) => {
    setSelectedServices(services);
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: open ? `calc(100% - ${240}px)` : "100%",
        marginLeft: open ? `${240}px` : 0,
        transition: "width 0.3s, margin-left 0.3s",
      }}
    >
      <Toolbar />
      {showServices ? (
        <>
          <OurServices
            selectedServices={selectedServices}
            onSelectedServicesChange={handleSelectedServicesChange}
          />
          <ShowServices selectedServices={selectedServices} />
        </>
      ) : (
        <ContactForm fields={fields} setFields={setFields} />
      )}
    </Box>
  );
};

export default ContentContainer;
