import { AppBar, Button, Container, ThemeProvider, Toolbar, Typography } from "@mui/material"
import React from "react"
import { mainTheme } from "../themes"

export const LoginHeader = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <AppBar>
        <Toolbar>
          <Container>
            <Button sx={{color: "#E9EBF8"}} disableRipple><Typography variant="h5">Craft Tracker</Typography></Button>
          </Container>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}