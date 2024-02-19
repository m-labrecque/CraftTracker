import { Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../FireBase";

export const Home = () => {
  const auth = getAuth();
  const [loggedIn, setLoggedIn] = React.useState<string>("false");

  React.useEffect(() => {
    if (auth.currentUser) {
      const userRef = collection(db, 'user');
      const user = {
        uid: auth.currentUser.uid,
        projects: []
      }

      const hello = async() => {
        const userDoc = doc(userRef, auth.currentUser?.uid);
        await setDoc(userDoc, user, {merge: true});
      }

      hello();
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