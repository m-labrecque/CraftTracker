import { Button, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../FireBase";
import { Link } from "react-router-dom";

export const Home = () => {
  const auth = getAuth();

  React.useEffect(() => {
    if (auth.currentUser?.uid !== null) {
      const userRef = collection(db, "users");
      const user = {
        uid: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        Projects: []
      };

      const updateUser = async() => {
        try {
          const userDoc = doc(userRef, auth.currentUser?.uid);
          const userSnap = await getDoc(userDoc);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            if (!userData.uid || !userData.Projects || !userData.email) {
              await setDoc(userDoc, user, {merge: true});
              console.log("User added to user collection");
            }
            else {
              console.log("User already in collection");
            }
          }
          else {
            await setDoc(userDoc, user, {merge: true})
            console.log("Document did not already exist, added now");
          }
        } catch (e) {
          console.log("error");
        }
      }

      updateUser();
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