import { Box, Button, Grid, Paper, ThemeProvider, Typography } from "@mui/material"
import React from "react"
import { Project } from "../AppBaseTypes";
import { mainTheme } from "../themes";
import { Header } from "../headers/Header";
import { useNavigate } from "react-router-dom";

export const Projects = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    setProjects([{Name: "Folklore Cartigan"}, {Name: "Patchwork Cartigan"}]);
  }, []);

  function gotoProject(name: string) {
    console.log(name);
    navigate('/projecthome', {state: {ProjectName: name}});
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
    </ThemeProvider>
  )
}