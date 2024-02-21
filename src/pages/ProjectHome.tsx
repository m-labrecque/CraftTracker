import React from "react"
import { ThemeProvider } from "@emotion/react"
import { mainTheme } from "../themes"
import { Header } from "../headers/Header"
import { Grid, Paper, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"
import { Project } from "../AppBaseTypes"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../FireBase"
import { getAuth } from "firebase/auth"


export const ProjectHome = () => {
  const location = useLocation();
  const auth = getAuth(); 

  const [name, setName] = React.useState<string>("");
  const [currentProject, setCurrentProject] = React.useState<Project>();
  const projectName = location.state?.ProjectName || "";

  const getProject = async() => {
    const userRef = doc(db, 'users', auth.currentUser?.uid || "");
    const userSnap = await getDoc(userRef);
    const data = userSnap.data();

    if (data?.Projects) {
      const filteredProjects = data.Projects.filter((n: {Name: string}) => n.Name === projectName);
      setCurrentProject(filteredProjects[0]);
      console.log(currentProject);
    }
  }

  React.useEffect(() => {
    setName(location.state?.ProjectName);
    getProject();
  }, [])

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
            <Typography>Counters</Typography>
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