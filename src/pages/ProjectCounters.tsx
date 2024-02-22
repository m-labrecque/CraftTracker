import { IconButton, Paper, Stack, ThemeProvider, Typography } from "@mui/material"
import { mainTheme } from "../themes"
import React from "react";
import { useLocation } from "react-router-dom";
import { Project } from "../AppBaseTypes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FireBase";
import { getAuth } from "firebase/auth";
import { Header } from "../headers/Header";
import { AddCircleOutlineRounded, RemoveCircleOutlineRounded } from "@mui/icons-material";


export const ProjectCounters = () => {  
  const location = useLocation();
  const auth = getAuth();

  const [currentProject, setCurrentProject] = React.useState<Project>();
  const projectName = location.state?.ProjectName || "";

  const getProject = async() => {
    const userRef = doc(db, 'users', auth.currentUser?.uid || "");
    const userSnap = await getDoc(userRef);
    const data = userSnap.data();

    console.log(data);
    if (data?.Projects) {
      const filteredProjects = data.Projects.filter((n: {Name: string}) => n.Name === projectName);
      setCurrentProject(filteredProjects[0]);
      console.log(currentProject);
    }
  }

  React.useEffect(() => {
    // getProject();
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <Header/>
      {/* main counter */}
      <Paper sx={{backgroundColor: "#E9EBF8"}}>
        <Stack
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={2}
          >
          <IconButton size="large" color="primary" sx={{fontSize: '4.5rem'}}>
            <RemoveCircleOutlineRounded fontSize="inherit" />
          </IconButton>
          <Typography>count</Typography>
          <IconButton size="large" color="primary" sx={{fontSize: '4.5rem'}}>
            <AddCircleOutlineRounded fontSize="inherit" />
          </IconButton>
        </Stack>
      </Paper>
      {/* all the other counters (the counters linked to the main counter) */}
      <Typography>This is where the rest of the counters go</Typography>
    </ThemeProvider>
  )
}