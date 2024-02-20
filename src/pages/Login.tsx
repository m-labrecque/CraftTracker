import { Button, ThemeProvider } from "@mui/material";
import { getAuth, signInWithPopup } from "firebase/auth"
import React from "react"
import { useNavigate } from "react-router-dom";
import { google } from "../FireBase";
import { color } from "../themes";
import { Header } from "../headers/Header";

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
    <ThemeProvider theme={color}>
      <Header/>
      <p>Login page</p>
      <Button onClick={googleSignin}>Google</Button>
    </ThemeProvider>
  )
}