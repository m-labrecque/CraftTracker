import { Box, Button, Grid, Paper, ThemeProvider, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import React from "react";
import { db } from "../FireBase";
import { Link } from "react-router-dom";
import { mainTheme } from "../themes";
import { Header } from "../headers/Header";

export const Home = () => {
  const auth = getAuth();

  

  return (
    <ThemeProvider theme={mainTheme}>
      <Box sx={{display: "flex"}}>
        <Header/>
        <Box marginTop={10} sx={{height: '100vh'}}>
          <Grid
            container
            justifyContent="center"
            spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{
                p: 2,
                backgroundColor: '#E9EBF8'
              }}>
                <Link to={"/projects"}>
                  <Button>Projects</Button>
                </Link>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{
                p: 2,
                backgroundColor: '#E9EBF8'
              }}>
                <Typography>Something else</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  )
}