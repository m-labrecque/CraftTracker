import { ThemeProvider, Typography } from "@mui/material"
import { mainTheme } from "../themes"


export const Counter = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Typography>Counter</Typography>
    </ThemeProvider>
  )
}