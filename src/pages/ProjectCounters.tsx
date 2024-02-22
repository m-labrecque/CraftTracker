import { ThemeProvider, Typography } from "@mui/material"
import { mainTheme } from "../themes"
import { MainCounter } from "../projectComponents/MainCounter"
import React from "react";
import { useLocation } from "react-router-dom";
import { Project } from "../AppBaseTypes";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../FireBase";
import { getAuth } from "firebase/auth";
import { Header } from "../headers/Header";


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
      <MainCounter />
      <Typography>This is where the rest of the counters go</Typography>
    </ThemeProvider>
  )
}