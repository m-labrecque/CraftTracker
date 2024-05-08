import { AppBar, Button, ThemeProvider, Toolbar } from "@mui/material"
import React from "react"
import { mainTheme } from "../themes"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth"

export const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  
  const logOut = () => {
    signOut(auth).then(() => {
      console.log("logged out successfully");
      navigate("/");
    }).catch((e) => {
      console.log("log out failed" + e)
    })
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <AppBar position="fixed">
        <Toolbar>
          <Link to='/home'>
            <Button sx={{backgroundColor: "#ffffff"}}>Home</Button>
          </Link>
          {/* <Typography style={{color: '#AAADBC'}}>Header</Typography> */}
          <Button onClick={logOut} sx={{backgroundColor: "#ffffff"}}>Sign Out</Button>
        </Toolbar>
        
      </AppBar>
    </ThemeProvider>
  )
}