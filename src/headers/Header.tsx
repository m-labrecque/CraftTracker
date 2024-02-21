import { AppBar, Button, IconButton, ThemeProvider, Toolbar, Typography } from "@mui/material"
import React from "react"
import { mainTheme } from "../themes"
import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <AppBar>
        <Toolbar>
          <Link to='/home'>
            <Button sx={{backgroundColor: "#ffffff"}}>Home</Button>
          </Link>
          {/* <Typography style={{color: '#AAADBC'}}>Header</Typography> */}
        </Toolbar>
        
      </AppBar>
    </ThemeProvider>
  )
}