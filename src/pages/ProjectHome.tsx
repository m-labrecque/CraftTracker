import React from "react"
import { ThemeProvider } from "@emotion/react"
import { mainTheme } from "../themes"
import { Header } from "../headers/Header"
import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { Project } from "../AppBaseTypes"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../FireBase"
import { getAuth } from "firebase/auth"


export const ProjectHome = () => {
  const location = useLocation();
  const auth = getAuth();
  const navigate = useNavigate();

  const [name, setName] = React.useState<string>("");
  const [currentProject, setCurrentProject] = React.useState<Project>();
  const projectName = location.state?.projectName || "";
  const [multiplePieces, setMultiplePieces] = React.useState<boolean>(false);

  const getProject = async() => {
    try {
      const userRef = doc(db, 'users', auth.currentUser?.uid || "");
      const projectRef = doc(userRef, 'projects', projectName);
      const projectSnap = await getDoc(projectRef);
      const data = projectSnap.data();
      console.log("got project data");

      if (data) {
        setCurrentProject({name: data.name, mainCounterCount: data.mainCounter, multiPiece: data.multiPiece});
        setMultiplePieces(data.multiPiece);
      }
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    setName(location.state?.projectName);
    getProject();
  }, []);

  const gotoCounters = () => {
    navigate('/projectcounters', {state: {projectName: name}});
  }

  const gotoPieces = () => {
    navigate('/projectpieces', {state: {projectName: name}});
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Box sx={{display: "flex"}}>
        <Header/>
        <Box marginTop={10} sx={{height: '100vh'}}>
          <Typography>Project Home Page</Typography>
          <Typography>{name}</Typography>
          <Grid 
            container
            justifyContent="center"
            spacing={1}
            >
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: 2, backgroundColor: '#E9EBF8'}}>
                {!multiplePieces && <Button onClick={gotoCounters}>Counters</Button>}
                {multiplePieces && <Button onClick={gotoPieces}>Pieces</Button>}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{
                p: 2,
                backgroundColor: '#E9EBF8'
              }}>
                <Typography>Information</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  )
}