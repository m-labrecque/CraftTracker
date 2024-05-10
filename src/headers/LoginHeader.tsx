import { AppBar, Container, ThemeProvider, Toolbar, Typography } from "@mui/material"
import React from "react"
import { mainTheme } from "../themes"

export const LoginHeader = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <AppBar>
        <Toolbar>
          <Container>
            <Typography color="#AAADBC" variant="h5">Craft Tracker</Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}