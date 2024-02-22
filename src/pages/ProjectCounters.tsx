import { IconButton, Paper, Stack, ThemeProvider, Typography } from "@mui/material"
import { mainTheme } from "../themes"
import React from "react";
import { useLocation } from "react-router-dom";
import { Counter, MainCounter, Project } from "../AppBaseTypes";
import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import { db } from "../FireBase";
import { getAuth } from "firebase/auth";
import { Header } from "../headers/Header";
import { AddCircleOutlineRounded, RemoveCircleOutlineRounded } from "@mui/icons-material";
import { PrimaryCounter } from "../projectComponents/MainCounter";


export const ProjectCounters = () => {  
  const location = useLocation();
  const auth = getAuth();

  const [currentProject, setCurrentProject] = React.useState<Project>();
  const [primaryCounter, setPrimaryCounter] = React.useState<number>(0);
  const [secondaryCounters, setSecondaryCounters] = React.useState<Counter[]>([]);
  const projectName = location.state?.ProjectName || "";

  const getProject = async() => {
    try {
      const userDoc = doc(db, 'users', auth.currentUser?.uid || "");
      const projectDoc = doc(userDoc, 'projects', projectName);
      const projectSnap = await getDoc(projectDoc);
      const data = projectSnap.data();
      console.log("got project data");

      if (data) {
        setCurrentProject({Name: data.Name, mainCounterCount: data.mainCounterCount, otherCounters: data.otherCounters});
        setPrimaryCounter(data.mainCounterCount);
        console.log("set all data for project counters");
      }

    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    getProject();
  }, []);

  const increasePrimary = async() => {
    try {
      if (auth.currentUser) {
        const projectDoc = doc(db, 'users', auth.currentUser.uid, 'projects', projectName);
        await updateDoc(projectDoc, {mainCounterCount: increment(1)});
        getProject();
      }
    } catch (e) {
      console.log(e);
    }

    console.log("increase primary");
  }

  const decreasePrimary = async() => {
    try {
      if (auth.currentUser) {
        const projectDoc = doc(db, 'users', auth.currentUser.uid, 'projects', projectName);
        await updateDoc(projectDoc, {mainCounterCount: increment(-1)});
        getProject();
      }
    } catch (e) {
      console.log(e);
    }
    console.log("decrease primary");
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Header/>
      {/* primary counter */}
      <Paper sx={{backgroundColor: "#E9EBF8"}}>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <IconButton size="large" color="primary" sx={{fontSize: '4.5rem'}} onClick={decreasePrimary}>
            <RemoveCircleOutlineRounded fontSize="inherit"/>
          </IconButton>
          <Typography>{primaryCounter}</Typography>
          <IconButton size="large" color="primary" sx={{fontSize: '4.5rem'}} onClick={increasePrimary}>
            <AddCircleOutlineRounded fontSize="inherit"/>
          </IconButton>
        </Stack>
      </Paper>

      {/* all the other counters (the counters linked to the main counter) */}
      <Typography>This is where the rest of the counters go</Typography>
    </ThemeProvider>
  )
}