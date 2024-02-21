import { Box, Button, Dialog, DialogContent, Grid, Paper, TextField, ThemeProvider, Typography } from "@mui/material"
import React from "react"
import { Project } from "../AppBaseTypes";
import { mainTheme } from "../themes";
import { Header } from "../headers/Header";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../FireBase";

export const Projects = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const navigate = useNavigate();
  const auth = getAuth();

  const [open, setOpen] = React.useState<boolean>(false);
  const [newProjectName, setNewProjectName] = React.useState<string>("");

  const getProjects = async() => {
    const userRef = doc(db, "users", auth.currentUser?.uid || "");
    const userSnap = await getDoc(userRef);
    const data = userSnap.data();
    console.log("got data");

    console.log(data);

    if (data?.Projects) {
      setProjects(data.Projects);
      console.log("got projects");
    }
  }

  React.useEffect(() => { 
    getProjects();
  }, []);

  function gotoProject(name: string) {
    console.log(name);
    navigate('/projecthome', {state: {ProjectName: name}});
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleCreate = async() => {
    console.log("create");
    const newProject = {Name: newProjectName};

    const userRef = doc(db, "users", auth.currentUser?.uid || "");
    await updateDoc(userRef, {Projects: arrayUnion(newProject)});
    getProjects();
    setOpen(false);
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectName(event.target.value);
  }
  
  return (
    <ThemeProvider theme={mainTheme}>
      <Header/>
      <Typography>Projects</Typography>
      <Box display="flex" flexWrap="wrap" justifyContent="space-around">
      <Grid 
        container
        justifyContent="center"
        spacing={1}
        >
        {projects.map((p) => (
          <Grid key={p.Name} item xs={6} md={8}>
            <Paper sx={{
              p: 2,
              backgroundColor: '#E9EBF8'
            }}>
            <Button onClick={() => gotoProject(p.Name)}>{p.Name}</Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
      </Box>
      <Button onClick={handleOpen}>New Project</Button>

      {/* popup for creating new project */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField 
            id="Project Name"
            onChange={handleNameChange}/>
          <Button onClick={handleCreate}>Create</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}