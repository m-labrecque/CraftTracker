import { AppBar, Button, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material"
import React from "react"
import { mainTheme } from "../themes"

export const Header = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <AppBar>
        <Toolbar>
          <Button>Home</Button>
          <Typography style={{color: '#AAADBC'}}>Header</Typography>
        </Toolbar>
        
      </AppBar>
    </ThemeProvider>
  )
}