import React from "react"
import { ThemeProvider } from "@emotion/react"
import { mainTheme } from "../themes"
import { Header } from "../headers/Header"
import { Typography } from "@mui/material"
import { useLocation } from "react-router-dom"


export const ProjectHome = () => {
  const location = useLocation();
  const [name, setName] = React.useState<string>("");

  React.useEffect(() => {
    setName(location.state?.ProjectName);
  }, [])

  return (
    <ThemeProvider theme={mainTheme}>
      <Header/>
      <Typography>Project Home Page</Typography>
      <Typography>{name}</Typography>
    </ThemeProvider>
  )
}