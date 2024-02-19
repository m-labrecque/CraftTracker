import { Button } from "@mui/material";
import { getAuth, signInWithPopup } from "firebase/auth"
import React from "react"
import { useNavigate } from "react-router-dom";
import { google } from "../FireBase";

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
      // create entry in database for user if it does not already exist

      navigate("/home");
    }
  }

  return (
    <>
      <p>Login page</p>
      <Button onClick={googleSignin}>Google</Button>
    </>
  )
}