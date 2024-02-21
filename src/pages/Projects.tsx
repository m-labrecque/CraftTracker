import { Box, Button, Dialog, DialogContent, Grid, Paper, TextField, ThemeProvider, Typography } from "@mui/material"
import React from "react"
import { Project } from "../AppBaseTypes";
import { mainTheme } from "../themes";
import { Header } from "../headers/Header";
import { useNavigate } from "react-router-dom";

export const Projects = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);
  const [newProjectName, setNewProjectName] = React.useState<string>("");

  React.useEffect(() => {
    setProjects([{Name: "Folklore Cartigan"}, {Name: "Patchwork Cartigan"}]);
  }, []);

  function gotoProject(name: string) {
    console.log(name);
    navigate('/projecthome', {state: {ProjectName: name}});
  }

  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  }

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  }

  const handleCreate = () => {
    console.log("create");
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
          <Grid item xs={6} md={8}>
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