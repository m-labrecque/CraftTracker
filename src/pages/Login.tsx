import { Button } from "@mui/material";
import { getAuth, signInWithPopup } from "firebase/auth"
import React from "react"
import { useNavigate } from "react-router-dom";
import { db, google } from "../FireBase";
import { collection, doc, updateDoc } from "firebase/firestore";

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
      const user = collection(db, 'user');
      console.log(user);

      const userDoc = doc(user, auth.currentUser.uid);
      
      // const ref = doc(db, "users", auth.currentUser.uid);
      // console.log("ref");
      // await updateDoc(ref, {user: auth.currentUser.uid})
      // console.log("hello");
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