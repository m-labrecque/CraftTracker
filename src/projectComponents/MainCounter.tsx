import { IconButton, Paper, Stack, ThemeProvider, Typography } from "@mui/material"
import { mainTheme } from "../themes"
import { AddCircleOutlineRounded, RemoveCircleOutlineRounded } from "@mui/icons-material";
import { MainCounter } from "../AppBaseTypes";

export const PrimaryCounter = ({data}: {data: MainCounter}) => {

  return (
    <ThemeProvider theme={mainTheme}>
      <Paper sx={{backgroundColor: "#E9EBF8"}}>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={2}
        >
          <IconButton size="large" color="primary" sx={{fontSize: '4.5rem'}}>
            <RemoveCircleOutlineRounded fontSize="inherit"/>
          </IconButton>
          <Typography>{data.count}</Typography>
          <IconButton size="large" color="primary" sx={{fontSize: '4.5rem'}}>
            <AddCircleOutlineRounded fontSize="inherit"/>
          </IconButton>
        </Stack>
      </Paper>
    </ThemeProvider>
  )
}