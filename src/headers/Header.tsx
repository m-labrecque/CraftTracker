import { AppBar, Button, IconButton, ThemeProvider, Typography } from "@mui/material"
import React from "react"
import { color } from "../themes"

export const Header = () => {
  return (
    <ThemeProvider theme={color}>
      <AppBar>
        <IconButton>
          
        </IconButton>
      </AppBar>
    </ThemeProvider>
  )
}