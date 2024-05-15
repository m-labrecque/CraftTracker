import { Button, Dialog, DialogContent, FormControlLabel, FormGroup, Grid, IconButton, Paper, Stack, Switch, TextField, ThemeProvider, Typography } from "@mui/material"
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { mainTheme } from "../themes";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Counter } from "../AppBaseTypes";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../FireBase";

export const SecondaryCounter = ({name, count, projectName, pieceName}: {name: string, count: number, projectName: string, pieceName: string}) => {
  const auth = getAuth();

  const [open, setOpen] = useState<boolean>(false);
  const [linkedToGlobal, setLinkedToGlobal] = useState<boolean>(false);
  const [resets, setResets] = useState<boolean>(false);
  const [resetNumber, setResetNumber] = useState<string>("");
  const [doesInterval, setDoesInterval] = useState<boolean>(false);
  const [increaseInterval, setIncreaseInterval] = useState<string>("");

  const handleOpen = async() => {
    console.log("open");
    if (auth.currentUser) {
      // get counter data
      var c: Counter;
      var counterDoc;
      if (pieceName === "") {
        counterDoc = doc(db, 'users', auth.currentUser.uid, 'projects', projectName, 'secondaryCounters', name);
      }
      else {
        counterDoc = doc(db, 'users', auth.currentUser.uid, 'projects', projectName, 'pieces', pieceName, 'secondaryCounters', name);
      }

      const counterSnap = await getDoc(counterDoc);
      const data = counterSnap.data();
      console.log(data);
      if (data) {
        // put data into the fields
        setLinkedToGlobal(data.linkedToGlobal);
        setResets(data.doesReset);
        setResetNumber(data.resetAt);
        setDoesInterval(data.doesInterval);
        setIncreaseInterval(data.increaseInterval);
      } 
    }
    setOpen(true);
  }

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  }

  const handleSave = async() => {
    // save the changes made
    if (auth.currentUser) {
      var counterDoc;
      if (pieceName === "") {
        console.log("single save");
        counterDoc = doc(db, 'users', auth.currentUser.uid, 'projects', projectName, 'secondaryCounters', name);
      }
      else {
        console.log("multipiece save");
        counterDoc = doc(db, 'users', auth.currentUser.uid, 'projects', projectName, 'pieces', pieceName, 'secondaryCounters', name);
      }

      await updateDoc(counterDoc, {linkedToGlobal: linkedToGlobal, doesReset: resets, resetAt: resetNumber, doesInterval: doesInterval, increaseNumber: increaseInterval})
 
      setOpen(false);
    }
    
  }

  const handleLinkedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedToGlobal(event.target.checked);
  }

  const handleResetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResets(event.target.checked);
  }

  const handleResetAtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResetNumber(event.target.value);
  }

  const handleIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoesInterval(event.target.checked);
  }

  const handleIncreaseIntervalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncreaseInterval(event.target.value);
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Grid key={name} item xs={12} sm={6}>
        <Paper sx={{p: 1.5, backgroundColor: "#E9EBF8"}}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <IconButton disableRipple size="small" sx={{color: "#E9EBF8"}}><MoreVertRoundedIcon /></IconButton>
            <Typography variant="h6">{name}</Typography>
            <IconButton size="small"
              onClick={handleOpen}>
              <MoreVertRoundedIcon />
            </IconButton>
          </Stack>
          <Typography variant="h4">{count}</Typography>
        </Paper>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent sx={{backgroundColor: '#E9EBF8'}}>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
              <Typography paddingTop="3px">{name} Settings</Typography>
              <IconButton size="small" onClick={handleClose}>
                <CloseRoundedIcon fontSize="small"/>
              </IconButton>
            </Stack>
            <FormGroup>
              <FormControlLabel control={<Switch checked={linkedToGlobal} onChange={handleLinkedChange}/>} label="Linked with primary counter" />
              <FormControlLabel control={<Switch checked={resets} onChange={handleResetChange}/>} label="Resets" />
            </FormGroup>
            {resets && <TextField
              id="reset-at"
              label="Reset Counter At"
              variant="outlined"
              size="small"
              />}
            <FormGroup>
              <FormControlLabel control={<Switch checked={doesInterval} onChange={handleIntervalChange}/>} label="Custom Increase Interval" />
            </FormGroup>
            {doesInterval && <TextField
              id="increase-interval"
              label="Increase Interval"
              onChange={handleIncreaseIntervalChange}
              variant="outlined"
              size="small"
              />}
            <Button onClick={handleSave}>Save</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}