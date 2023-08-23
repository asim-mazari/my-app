import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../../../Store/ContactSlice";
import CountryList from "../../../Store/CountryList";
import { delCompanyInfo } from "../../../Store/delCompanyInfoSlice";
interface ContactDataProps {
  onEdit: (user: any) => void;
  setAddInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContactData({ onEdit, setAddInfo }: ContactDataProps) {
  const dispatch = useDispatch();
  // const data = useSelector((state: any) => {
  //   return state.users;
  // });
 
  const ComapnyInfo = useSelector((state: any) => {
    return state.getInfo;
  });


  // Local state to store the selected value from Autocomplete and sorting option
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [sortingOption, setSortingOption] = useState<string>("id");
  // Filter the data array to remove duplicates based on a unique property (e.g., 'id')
  const filteredData = ComapnyInfo.filter((item: any, index: number, self: any[]) => {
    return index === self.findIndex((obj) => obj.id === item.id);
  });

  const tableData = selectedValue
    ? filteredData.filter((item: any) => item.FullName === selectedValue)
    : filteredData;
  // Function to sort data based on the selected sorting option
  const sortData = (data: any[]) => {
    return data.sort((a, b) => {
      if (sortingOption === "label") {
        return a.Lable.localeCompare(b.Lable);
      } else if (sortingOption === "fullName") {
        return a.FullName.localeCompare(b.FullName);
      }
      // Default sorting by ID
      return a.id - b.id;
    });
  };
  const handleInputChange = (event: React.ChangeEvent<{}>, value: string) => {
    // If the input is empty, reset the selectedValue to show all data in the table
    if (value === "") {
      setSelectedValue(null);
    }
  };

  // Function to handle the deletion of data
  const handleDelete = async (id: number) => {
    dispatch(deleteContact(id));
    const data = { id: id };
    const delResponse = await dispatch(delCompanyInfo(data) as any);
    if (delResponse.type == "DeleteInfo/fulfilled") {
      alert("Company Info Removed");
    }
  };
  const handleEdit = (user: any) => {
    onEdit(user);
    setAddInfo(true);
  };
  function AddContactInfo() {
    setAddInfo(true);
  }
  return (
    <Grid sx={{ width: "100%" }} display="flex" justifyContent="center">
      <Paper
        elevation={3}
        sx={{ padding: "10px", marginLeft: "20px", width: "100%" }}
      >
        <Typography variant="h5">Personal Info</Typography>
        <Grid container display="flex">
          <FormControl sx={{ width: "20%" }}>
            <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortingOption}
              label="Sorting"
              onChange={(event) =>
                setSortingOption(event.target.value as string)
              }
            >
              <MenuItem value="id">ID</MenuItem>
              <MenuItem value="label">Label</MenuItem>
              <MenuItem value="fullName">Full Name</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            sx={{ width: "30%", marginLeft: "20px", marginRight: "20px" }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={ComapnyInfo.map((option: any) => ({ label: option.fullName }))}
            getOptionLabel={(option: any) => option.label}
            onChange={(event, value) => setSelectedValue(value?.label || null)}
            onInputChange={handleInputChange} // Handle input change
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
              />
            )}
          />
          <Button variant="outlined" onClick={AddContactInfo}>
            Add Info
          </Button>
        </Grid>
        <Table sx={{ width: "100%" }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Label</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Mobile</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Delete</TableCell> {/* Add delete button column */}
              <TableCell>Edit</TableCell> {/* Add delete button column */}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortData(tableData).map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.label}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.mobile}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>
                  {CountryList.find(
                    (country) => country.code === item.country
                  )?.name || ""}
                </TableCell>
                <TableCell>
                  {/* Add delete button */}
                  <IconButton
                    onClick={() => handleDelete(item.id)}
                    color="error"
                    aria-label="delete"
                  >
                    {/* Replace 'DeleteIcon' with your desired delete icon */}
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {/* Add edit button */}
                  <IconButton
                    onClick={() => handleEdit(item)}
                    color="primary"
                    aria-label="edit"
                  >
                    {/* Replace 'EditIcon' with your desired edit icon */}
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
}

export default ContactData;
