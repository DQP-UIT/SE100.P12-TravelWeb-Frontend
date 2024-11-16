import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Container,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

// Fake customer data to simulate API call
const fakeCustomer = {
  id: "1",
  fullName: "John Doe",
  email: "john.doe@example.com",
  phoneNumber: "123-456-7890",
  birthday: "1990-01-01",
  username: "johndoe",
  password: "password123",
  role: "Admin",
  loyaltyPoint: 1500,
  address: "123 Main St, Anytown, USA",
  avatar: "https://via.placeholder.com/150",
};

const ProviderInfo = () => {
  const [customer, setCustomer] = useState(fakeCustomer);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(fakeCustomer);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(customer); // Reset form data to original customer data
  };

  const handleSave = () => {
    setCustomer(formData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    // Handle delete customer logic here
    console.log("Delete customer:", customer);
    setCustomer(null); // Simulate customer deletion
  };

  return (
    <Container maxWidth="sm" className="flex flex-col items-center">
      <Typography variant="h4" component="h1">
        Provider Information
      </Typography>
      {customer ? (
        <Box
          className="w-full max-w-md p-4 mb-4 bg-white shadow-md rounded-lg flex flex-col items-center"
          border={1}
          borderColor="grey.300"
        >
          <Avatar
            src={customer.avatar}
            alt={customer.fullName}
            className="mb-4"
            sx={{ width: 100, height: 100 }}
          />
          {isEditing ? (
            <>
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Role</InputLabel>
                <Select
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Customer">Customer</MenuItem>
                  <MenuItem value="Provider">Provider</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Loyalty Points"
                name="loyaltyPoint"
                value={formData.loyaltyPoint}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button variant="contained" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h6" component="div" gutterBottom>
                {customer.fullName}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ID: {customer.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {customer.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Phone Number: {customer.phoneNumber}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Birthday: {customer.birthday}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Username: {customer.username}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Password: {customer.password}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Role: {customer.role}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Loyalty Points: {customer.loyaltyPoint}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Address: {customer.address}
              </Typography>
              <Box
                mt={2}
                display="flex"
                justifyContent="space-between"
                width="100%"
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Box>
            </>
          )}
        </Box>
      ) : (
        <Typography variant="body1" color="textSecondary">
          Customer has been deleted.
        </Typography>
      )}
    </Container>
  );
};

export default ProviderInfo;
