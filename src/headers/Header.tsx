import { AppBar, Box, Button, IconButton, Menu, ThemeProvider, Toolbar, Typography } from "@mui/material"
import React from "react"
import { mainTheme } from "../themes"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signOut } from "firebase/auth"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export const Header = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const logOut = () => {
    signOut(auth).then(() => {
      console.log("logged out successfully");
      navigate("/");
    }).catch((e) => {
      console.log("log out failed" + e)
    })

  }
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <AppBar position="fixed">
        <Toolbar sx = {{display: 'flex', justifyContent: 'space-between'}}>
          <IconButton
            size="medium"
            sx={{color: "#E9EBF8"}}
            onClick={(e) => handleMenuOpen(e)}
          ><MenuRoundedIcon/></IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <Button onClick={logOut}>Log Out</Button>
          </Menu>
          <Link to='/projects'>
            <Button sx={{color: "#E9EBF8"}}><Typography variant="h5">Craft Tracker</Typography></Button>
          </Link>
          <Box width="25px"></Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}