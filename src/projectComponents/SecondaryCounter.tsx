import { Grid, Paper, Typography } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const SecondaryCounter = ({name, count}: {name: string, count: number}) => {
  return (
    <Grid key={name} item xs={12} sm={6}>
      <Paper sx={{p: 1.5, backgroundColor: "#E9EBF8"}}>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="h4">{count}</Typography>
      </Paper>
    </Grid>
  )
}