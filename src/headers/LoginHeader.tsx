import { AppBar, Box, Button, Container, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material"
import React from "react"
import { mainTheme } from "../themes"
import { Link } from "react-router-dom"

export const LoginHeader = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <AppBar>
        <Toolbar>
          <Container>
            <Typography variant="h5">Craft Tracker</Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}