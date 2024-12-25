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

const UserInfo = ({ user, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(user);
    onClose();
  };

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    // Handle delete user logic here
    console.log("Delete user:", user);
    onClose();
  };

  return (
    <Container maxWidth="lg" className="flex flex-col items-center min-w-96">
      <Typography variant="h4" component="h1">
        User Information
      </Typography>
      {user ? (
        <Box
          className={
            isEditing
              ? "w-full max-w-md p-4 mb-4 bg-white shadow-md rounded-lg flex flex-col items-center"
              : "w-full max-w-md p-4 mb-4 bg-teal-50 shadow-md rounded-lg flex flex-col items-center"
          }
          border={1}
          borderColor="grey.300"
        >
          <Avatar
            src={user.avatar}
            alt={user.name}
            className="mb-4"
            sx={{ width: 100, height: 100 }}
          />
          {isEditing ? (
            <>
              <TextField
                label="Full Name"
                name="name"
                value={formData.name}
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
                name="phone"
                value={formData.phone}
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
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                ID: {user.id}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Email: {user.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Phone: {user.phone}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Role: {user.role}
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
          user has been deleted.
        </Typography>
      )}
    </Container>
  );
};

export default UserInfo;
