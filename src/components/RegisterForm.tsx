import React from "react";
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const navigate = useNavigate();
  async function handleSubmit(
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const response = await axios
      .post("http://localhost:5000/users/create", {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          alert("Passwords do not match");
        } else {
          console.log(error.message);
        }
      });
    try {
      sessionStorage.setItem("userId", response?.data.id);
    } catch (error) {
      console.log(error);
    }
    sessionStorage.setItem("email", email);
    navigate("/criteria");
  }

  return (
    <Box sx={{ paddingTop: "2rem" }}>
      <Paper
        sx={{
          top: "5rem",
          width: {
            xs: "90%",
            sm: "60%",
            md: "50%",
            lg: "40%",
            xl: "30%",
          },
          margin: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{ fontSize: "1.5rem", margin: "auto", padding: "1rem 0 1rem 0" }}
        >
          Register
        </Typography>
        <form
          onSubmit={async (event: React.SyntheticEvent) => {
            event.preventDefault();
            const target = event.target as typeof event.target & {
              email: { value: string };
              password: { value: string };
              confirmPassword: { value: string };
            };
            const email = target.email.value;
            const password = target.password.value;
            const confirmPassword = target.confirmPassword.value;
            await handleSubmit(email, password, confirmPassword);
          }}
        >
          <Container
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              width: "80%",
              padding: "1rem 0 1rem 0",
              margin: "auto",
            }}
          >
            <TextField
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
            <TextField
              sx={{ padding: "0.5rem 0 0.5rem 0" }}
              name="password"
              id="password"
              type="password"
              placeholder="Password"
              required
            />
            <TextField
              sx={{ padding: " 0 0 1rem 0" }}
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              required
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: {
                  xs: "60%",
                  sm: "50%",
                  md: "40%",
                },
                margin: "auto",
              }}
            >
              Register
            </Button>
          </Container>
        </form>
      </Paper>
    </Box>
  );
}
