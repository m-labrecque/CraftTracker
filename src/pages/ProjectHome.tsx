import React from "react"
import { ThemeProvider } from "@emotion/react"
import { mainTheme } from "../themes"
import { Header } from "../headers/Header"
import { Grid, Paper, Typography } from "@mui/material"
import { useLocation } from "react-router-dom"


export const ProjectHome = () => {
  const location = useLocation();
  const [name, setName] = React.useState<string>("");

  React.useEffect(() => {
    setName(location.state?.ProjectName);
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