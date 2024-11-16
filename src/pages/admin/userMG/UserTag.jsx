import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const UserTag = ({ user }) => {
  return (
    <Box
      className="w-full max-w-md p-4 mb-1 bg-white shadow-md rounded-lg flex items-center hover:scale-105 hover:cursor-pointer"
      border={1}
      borderColor="grey.300"
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
  );
};

export default UserTag;