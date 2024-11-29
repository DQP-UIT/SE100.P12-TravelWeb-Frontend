import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  Card,
  CardContent,
} from "@mui/material";

// Fake user data
const fakeUser = {
  id: "1",
  fullName: "John Doe",
  email: "john.doe@example.com",
  phoneNumber: "123-456-7890",
  address: "123 Main St, Anytown, USA",
  avatar: "https://via.placeholder.com/150",
};

// Fake order data
const fakeOrders = [
  { id: "1", item: "Product 1", quantity: 2, price: 50 },
  { id: "2", item: "Product 2", quantity: 1, price: 100 },
  { id: "3", item: "Product 3", quantity: 3, price: 30 },
];

// Fake QR code data
const fakeQRCode = "https://via.placeholder.com/150";

// Fake bank account data
const fakeBankAccount = {
  accountHolder: "John Doe",
  bankName: "Bank of Anytown",
  accountNumber: "123456789",
  totalAmount: fakeOrders.reduce(
    (total, order) => total + order.quantity * order.price,
    0
  ),
  paymentDescription: "Payment for Order #12345",
};

const PaymentPage = () => {
  const [user, setUser] = useState(fakeUser);
  const [orders, setOrders] = useState([]);
  const [qrCode, setQRCode] = useState("");
  const [bankAccount, setBankAccount] = useState(fakeBankAccount);

  useEffect(() => {
    // Simulate API calls
    setOrders(fakeOrders);
    setQRCode(fakeQRCode);
    setBankAccount(fakeBankAccount);
  }, []);

  const handlePayment = () => {
    // Handle payment logic here
    console.log("Payment submitted");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom className="text-center">
        Payment Information
      </Typography>
      <Box display="flex" flexDirection="column" gap={4}>
        {/* User Information Card */}
        <Card>
          <CardContent className="bg-blue-gray-50">
            <Typography variant="h6" gutterBottom>
              User Information
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar
                src={user.avatar}
                alt={user.fullName}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Box>
                <Typography variant="body1">{user.fullName}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.phoneNumber}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.address}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        {/* Invoice Card */}
        <Card>
          <CardContent className="bg-green-50">
            <Typography variant="h6" gutterBottom>
              Invoice
            </Typography>
            {orders.map((order) => (
              <Box
                key={order.id}
                display="flex"
                justifyContent="space-between"
                mb={1}
              >
                <Typography variant="body2">{order.item}</Typography>
                <Typography variant="body2">
                  {order.quantity} x {order.price} VND
                </Typography>
              </Box>
            ))}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {orders.reduce(
                  (total, order) => total + order.quantity * order.price,
                  0
                )}{" "}
                VND
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* QR Code Card */}
        <Card>
          <CardContent className="flex flex-col items-center">
            <Typography variant="h6" gutterBottom>
              Scan QR Code to Pay
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt={2}
              mb={2}
            >
              <img src={qrCode} alt="QR Code" />
              <Typography variant="body1" mt={2}>
                Account Holder: {bankAccount.accountHolder}
              </Typography>
              <Typography variant="body1">
                Bank Name: {bankAccount.bankName}
              </Typography>
              <Typography variant="body1">
                Account Number: {bankAccount.accountNumber}
              </Typography>
              <Typography variant="body1">
                Total Amount: {bankAccount.totalAmount} VND
              </Typography>
              <Typography variant="body1">
                Payment Description: {bankAccount.paymentDescription}
              </Typography>
            </Box>
            {/* Payment Button */}
            <Button
              variant="contained"
              color="primary"
              className="w-52"
              onClick={handlePayment}
            >
              Submit Payment
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default PaymentPage;
