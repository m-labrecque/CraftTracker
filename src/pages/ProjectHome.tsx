import React from "react"
import { ThemeProvider } from "@emotion/react"
import { mainTheme } from "../themes"
import { Header } from "../headers/Header"
import { Button, Grid, Paper, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { Project } from "../AppBaseTypes"
import { collection, doc, getDoc } from "firebase/firestore"
import { db } from "../FireBase"
import { getAuth } from "firebase/auth"


export const ProjectHome = () => {
  const location = useLocation();
  const auth = getAuth();
  const navigate = useNavigate();

  const [name, setName] = React.useState<string>("");
  const [currentProject, setCurrentProject] = React.useState<Project>();
  const projectName = location.state?.ProjectName || "";

  const getProject = async() => {
    try {
      const userRef = doc(db, 'users', auth.currentUser?.uid || "");
      const projectRef = doc(userRef, 'projects', projectName);
      const projectSnap = await getDoc(projectRef);
      const data = projectSnap.data();
      console.log("got project data");

      if (data) {
        setCurrentProject({Name: data.Name, mainCounterCount: data.mainCounter, otherCounters: data.otherCounters});
      }
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    setName(location.state?.ProjectName);
    getProject();
  }, []);

  const gotoCounters = () => {
    navigate('/projectcounters', {state: {ProjectName: name}});
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Header/>
      <Typography>Project Home Page</Typography>
      <Typography>{name}</Typography>
      <Grid 
        container
        justifyContent="center"
        spacing={1}
        >
        <Grid item>
          <Paper sx={{
            p: 2,
            backgroundColor: '#E9EBF8'
          }}>
            <Button onClick={gotoCounters}></Button>
          </Paper>
        </Grid>
        <Grid item>
          <Paper sx={{
            p: 2,
            backgroundColor: '#E9EBF8'
          }}>
            <Typography>Information</Typography>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}