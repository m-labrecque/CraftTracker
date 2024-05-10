import { Grid, IconButton, Paper, Stack, Typography } from "@mui/material"
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

export const SecondaryCounter = ({name, count}: {name: string, count: number}) => {
  

  return (
    <Grid key={name} item xs={12} sm={6}>
      <Paper sx={{p: 1.5, backgroundColor: "#E9EBF8"}}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <IconButton disableRipple size="small" sx={{color: "#E9EBF8"}}><MoreVertRoundedIcon /></IconButton>
          <Typography variant="h6">{name}</Typography>
          <IconButton size="small">
            <MoreVertRoundedIcon />
          </IconButton>
        </Stack>
        <Typography variant="h4">{count}</Typography>
      </Paper>
    </Grid>
  )
}