import { AppBar, Button, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material"
import React from "react"
import { mainTheme } from "../themes"
import { Link } from "react-router-dom"

export const LoginHeader = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <AppBar>
        <Toolbar>
          <Button>Hello</Button>
          {/* <Typography style={{color: '#AAADBC'}}>Header</Typography> */}
        </Toolbar>
        
      </AppBar>
    </ThemeProvider>
  )
}