import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/Logo.svg";
import CustomerMG from "../admin/CustomerMG";
import CustomerInfo from "../admin/CustomerInfo";
import ProviderMG from "../admin/ProviderMG";
import ProviderInfo from "../admin/ProviderInfo";
import RevenueReportPage from "../admin/report/RevenueReport";

const drawerWidth = 240;

const AdminMain = () => {
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [adminInfo, setAdminInfo] = useState(null);
  //const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fake API call to get admin info
    const fetchAdminInfo = async () => {
      // Simulate API call
      const fakeAdminInfo = {
        name: "Admin User",
        avatar: "https://via.placeholder.com/150",
      };
      setAdminInfo(fakeAdminInfo);
    };

    fetchAdminInfo();
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAdminInfoClick = () => {
    handleMenuClose();
    navigate("/admin/admininfo");
  };

  const renderPage = () => {
    switch (selectedPage) {
      case "Customer Management":
        return <CustomerMG />;
      case "Customer Info":
        return <CustomerInfo />;
      case "Provider Management":
        return <ProviderMG />;
      case "Provider Info":
        return <ProviderInfo />;
      case "Revenue Report":
        return <RevenueReportPage />;
      default:
        return <div>Welcome to the Admin Dashboard</div>;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
          {adminInfo && (
            <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
              <Avatar alt={adminInfo.name} src={adminInfo.avatar} />
            </IconButton>
          )}
          {/* <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleAdminInfoClick}>Admin Info</MenuItem>
          </Menu> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem button onClick={() => setSelectedPage("Dashboard")}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              button
              onClick={() => setSelectedPage("Customer Management")}
            >
              <ListItemText primary="Customer Management" />
            </ListItem>
            <ListItem button onClick={() => setSelectedPage("Customer Info")}>
              <ListItemText primary="Customer Info" />
            </ListItem>
            <ListItem
              button
              onClick={() => setSelectedPage("Provider Management")}
            >
              <ListItemText primary="Provider Management" />
            </ListItem>
            <ListItem button onClick={() => setSelectedPage("Provider Info")}>
              <ListItemText primary="Provider Info" />
            </ListItem>
            <ListItem button onClick={() => setSelectedPage("Revenue Report")}>
              <ListItemText primary="Revenue Report" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {renderPage()}
      </Box>
    </Box>
  );
};

export default AdminMain;
