import { Box, Button, Dialog, DialogActions, DialogContent, Grid, Paper, TextField, ThemeProvider, Typography } from "@mui/material"
import React from "react"
import { Project } from "../AppBaseTypes";
import { mainTheme } from "../themes";
import { Header } from "../headers/Header";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../FireBase";

export const Projects = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const navigate = useNavigate();
  const auth = getAuth();

  const [open, setOpen] = React.useState<boolean>(false);
  const [newProjectName, setNewProjectName] = React.useState<string>("");

  const getProjects = async() => {
    const userDoc = doc(db, "users", auth.currentUser?.uid || "");
    const projectsRef = collection(userDoc, "projects");
    const snapShot = await getDocs(projectsRef);

    let p: Project[] = [];
    snapShot.forEach((d) => {
      const data = d.data();
      p.push({name: data.Name, mainCounterCount: data.mainCounterCount});
    });
    setProjects(p);
    console.log("got projects");
  }

  React.useEffect(() => { 
    getProjects();
  }, []);

  function gotoProject(name: string) {
    console.log(name);
    navigate('/projecthome', {state: {projectName: name}});
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleCreate = async() => {
    console.log("create");
    console.log(newProjectName);
    if (newProjectName.length === 0) {
      alert("Error: project name cannot be empty");
    }
    else {
      if (auth.currentUser) {
        const newProject = {name: newProjectName, mainCounterCount: 0, otherCounters: []};

        const projectsDoc = doc(db, "users", auth.currentUser.uid, "projects", newProjectName);
        await setDoc(projectsDoc, newProject, {merge: true});

        setNewProjectName("");

        getProjects();
        setOpen(false);
      }
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectName(event.target.value);
  }
  
  return (
    <ThemeProvider theme={mainTheme}>
      <Box sx={{display: "flex"}}>
        <Header/>
        <Box marginTop={10} sx={{height: '100vh'}}>
          <Typography>Projects</Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="space-around">
          <Grid 
            container
            spacing={1}
            >
            {projects.map((p) => (
              <Grid key={p.name} item xs={12} sm={6}>
                <Paper sx={{
                  p: 2,
                  backgroundColor: '#E9EBF8'
                }}>
                <Button onClick={() => gotoProject(p.name)}>{p.name}</Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
          </Box>
          <Button onClick={handleOpen}>New Project</Button>

          {/* popup for creating new project */}
          <Dialog open={open} onClose={handleClose}>
            <DialogContent sx={{backgroundColor: '#E9EBF8'}}>
              <Typography>Create New Project</Typography>
              <TextField 
                id="Project Name"
                label="Name"
                onChange={handleNameChange}/>
            </DialogContent>
            <DialogActions sx={{backgroundColor: '#E9EBF8'}}>
              <Button onClick={handleCreate}>Create</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  )
}