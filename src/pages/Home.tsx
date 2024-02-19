import { Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import React from "react";

export const Home = () => {
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = React.useState<string>("false");

  React.useEffect(() => {
    if (auth.currentUser) {
      setLoggedIn("true");
    }
  }, [])

  return (
    <>
      <p>Hello, we are now on the home page</p>
      <Typography>{loggedIn}</Typography>
    </>
  )
}