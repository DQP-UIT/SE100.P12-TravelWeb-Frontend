import React, { useState } from "react";
import { Box, Typography, Avatar, Modal } from "@mui/material";
import UserInfo from "./UserInfo";

const UserTag = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        className="w-full max-w-md p-4 mb-1 bg-teal-100 shadow-md rounded-lg flex items-center hover:scale-105 hover:cursor-pointer"
        border={1}
        borderColor="grey.300"
        onClick={handleOpen}
      >
        <Avatar src={user.avatar} alt={user.name} className="mr-4" />
        <Box>
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
        </Box>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="10%"
          left="35%"
          transform="translate(-50%, -50%)"
          bgcolor="background.paper"
          boxShadow={24}
          p={4}
          borderRadius={2}
        >
          <UserInfo user={user} onClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default UserTag;
