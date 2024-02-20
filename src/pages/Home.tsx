import { Button, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../FireBase";
import { Link } from "react-router-dom";

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

      const updateUser = async() => {
        const userDoc = doc(userRef, auth.currentUser?.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (!userData.uid || !userData.projects) {
            await setDoc(userDoc, user, {merge: true});
            console.log("User added to user collection");
          }
          else {
            console.log("User already in collection");
          }
        }
        else {
          console.log("it does not exist");
        }
      }

      updateUser();
      setLoggedIn("true");
    }
  }, [])

  return (
    <>
      <Typography>Home page</Typography>
      <Link to={"/projects"}>
        <Button>Projects</Button>
      </Link>
    </>
  )
}