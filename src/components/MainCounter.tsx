import { ThemeProvider, Typography } from "@mui/material"
import { mainTheme } from "../themes"

export const MainCounter = () => {

  return (
    <ThemeProvider theme={mainTheme}>
      <Typography>Main Counter</Typography>
    </ThemeProvider>
  )
}