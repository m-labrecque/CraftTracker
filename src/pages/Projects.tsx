import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, FormControl, FormControlLabel, Grid, IconButton, Paper, Stack, TextField, ThemeProvider, Typography } from "@mui/material"
import React from "react"
import { Project } from "../AppBaseTypes";
import { mainTheme } from "../themes";
import { Header } from "../headers/Header";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../FireBase";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const Projects = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const navigate = useNavigate();
  const auth = getAuth();

  const [open, setOpen] = React.useState<boolean>(false);
  const [newProjectName, setNewProjectName] = React.useState<string>("");
  const [multiPiece, setMultiPiece] = React.useState<boolean>(false);

  const updateUser = async() => {
    try {
      if (auth.currentUser?.uid !== null) {
        const userRef = collection(db, "users");
        const user = {
          uid: auth.currentUser?.uid,
          email: auth.currentUser?.email,
        };

        const userDoc = doc(userRef, auth.currentUser?.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          if (!userData.uid || !userData.email) {
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

        getProjects();
      } 
    } catch (e) {
      console.log("error");
    }
  }

  const getProjects = async() => {
    const userDoc = doc(db, "users", auth.currentUser?.uid || "");
    const projectsRef = collection(userDoc, "projects");
    const snapShot = await getDocs(projectsRef);

    let p: Project[] = [];
    snapShot.forEach((d) => {
      const data = d.data();
      p.push({name: data.name, mainCounterCount: data.mainCounterCount, multiPiece: data.multiPiece});
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
    setMultiPiece(false);
  }

  const handleCreate = async() => {
    console.log("create");
    console.log(newProjectName);
    if (newProjectName.length === 0) {
      alert("Error: project name cannot be empty");
    }
    else {
      if (auth.currentUser) {
        const newProject = {name: newProjectName, mainCounterCount: 0, multiPiece: multiPiece};

        const projectsDoc = doc(db, "users", auth.currentUser.uid, "projects", newProjectName);
        await setDoc(projectsDoc, newProject, {merge: true});

        setNewProjectName("");
        setMultiPiece(false);

        getProjects();
        setOpen(false);
      }
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewProjectName(event.target.value);
  }
  
  const handleMultiPieceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMultiPiece(event.target.checked);
  }
  
  return (
    <ThemeProvider theme={mainTheme}>
      <Box sx={{display: "flex"}}>
        <Header/>
        <Box marginTop={10} sx={{height: '100vh'}}>
          <Typography>Projects</Typography>
          <Box display="flex" flexWrap="wrap" justifyContent="space-around">
            <Grid container spacing={1}>
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
              <Stack spacing={1}>
                <Stack direction="row" justifyContent={"space-between"}>
                  <Typography paddingTop="3px">Create New Project</Typography>
                  <IconButton size="small" onClick={handleClose}>
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                </Stack>
                <TextField 
                  id="Project Name"
                  label="Name"
                  onChange={handleNameChange}
                  variant="outlined"
                  size="small"/>
                <FormControl>
                  <FormControlLabel control={<Checkbox checked={multiPiece} onChange={handleMultiPieceChange}/>} label="Multiple Pieces"/>
                </FormControl>
                <Button onClick={handleCreate}>Create</Button>
              </Stack>
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </ThemeProvider>
  )
}