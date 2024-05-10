import { Button, Paper, ThemeProvider, Typography } from "@mui/material";
import { getAuth, signInWithPopup } from "firebase/auth"
import React from "react"
import { useNavigate } from "react-router-dom";
import { google } from "../FireBase";
import { mainTheme } from "../themes";
import { LoginHeader } from "../headers/LoginHeader";

export const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const googleSignin = async() => {
    try {
      await signInWithPopup(auth, google);
    }
    catch (error) {
      console.log(error);
    }

    if (auth.currentUser) {
      navigate("/home");
    }
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <LoginHeader/>
      <Paper sx={{
          background: '#E9EBF8',
          p: 2,
          // display: 'flex'
        }}>
        <Typography>Login Page</Typography>
        <Button onClick={googleSignin}>Login with Google</Button>
      </Paper>
    </ThemeProvider>
  )
}