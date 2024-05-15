import { Button, Checkbox, Dialog, DialogContent, FormControlLabel, FormGroup, IconButton, Stack, Switch, TextField, ThemeProvider, Typography } from "@mui/material"
import { mainTheme } from "../themes"
import React from "react"
import { getAuth } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../FireBase"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const NewCounterPopup = ({name, pName, getProject}: {name: string, pName: string, getProject: () => void}) => {
  const auth = getAuth();

  const [open, setOpen] = React.useState<boolean>(false);
  const [counterName, setCounterName] = React.useState<string>("");
  const [linkedToGlobal, setLinkedToGlobal] = React.useState<boolean>(true);
  const [doesReset, setDoesReset] = React.useState<boolean>(false);
  const [resetNumber, setResetNumber] = React.useState<string>("");
  const [doesInterval, setDoesInterval] = React.useState<boolean>(false);
  const [increaseInterval, setIncreaseInterval] = React.useState<string>("");

  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  }

  const handleClose = () => {
    console.log("close");
    setOpen(false);
    setLinkedToGlobal(true);
    setDoesReset(false);
    setDoesInterval(false);
  }
  
  const handleCreate = async() => {
    try {
      if (auth.currentUser) {
        var reset = -1;
        var increaseNumber = 1;
        var noError = true;

        if (doesReset) {
          reset = parseInt(resetNumber);
          if (isNaN(reset)) {
            console.log("reset number is not a number");
            alert("Error: reset number is not a number.");
            noError = false;
          }
        }
        
        if (doesInterval) {
          increaseNumber = parseInt(increaseInterval);
          if (isNaN(increaseNumber)) {
            console.log("increase interval is not a number");
            alert("Error: increase interval is not a number.");
            noError = false;
          }
        }
        
        if (noError) {
          const newCounter = {name: counterName, count: 0, linkedToGlobal: linkedToGlobal, doesReset: doesReset, 
                              resetAt: reset, doesInterval: doesInterval, increaseInterval: increaseNumber, sinceLastIncrease: 0};

          if (pName === "") {
            console.log("created counter for single");
            const counterDoc = doc(db, 'users', auth.currentUser.uid, 'projects', name, 'secondaryCounters', counterName);
            await setDoc(counterDoc, newCounter, {merge: true});
          }
          else {
            console.log("created counter for multiple")
            const counterDoc = doc(db, 'users', auth.currentUser.uid, 'projects', name, 'pieces', pName, 'secondaryCounters', counterName);
            await setDoc(counterDoc, newCounter, {merge: true});
          }
          console.log("create");
          setOpen(false);
          getProject();
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCounterName(event.target.value);
  }

  const handleLinkedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedToGlobal(event.target.checked);
  }

  const handleResetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDoesReset(event.target.checked);
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
      <Button onClick={handleOpen}>Add New Counter</Button>
      <Dialog open={open} onClose={handleClose} >
        <DialogContent sx={{backgroundColor: '#E9EBF8'}}>
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between">
            <Typography paddingTop="3px">Create New Counter</Typography>
              <IconButton size="small" onClick={handleClose}>
                <CloseRoundedIcon fontSize="small"/>
              </IconButton>
            </Stack>
            <TextField 
              id="counter-name"
              label="Name"
              onChange={handleNameChange}
              variant="outlined"
              size="small"
            />
            <FormGroup>
              {/* <FormControlLabel control={<Checkbox checked={linkedToGlobal} onChange={handleLinkedChange}/>} label="Link with primary counter" /> */}
              <FormControlLabel control={<Switch checked={linkedToGlobal} onChange={handleLinkedChange}/>} label="Link with primary counter" />
              <FormControlLabel control={<Switch checked={doesReset} onChange={handleResetChange}/>} label="Resets" />
            </FormGroup>
            {doesReset &&
              <TextField
              id="reset-at"
              label="Reset Counter At"
              onChange={handleResetAtChange}
              variant="outlined"
              size="small"
            />}

            <FormGroup>
              <FormControlLabel control={<Switch checked={doesInterval} onChange={handleIntervalChange}/>} label="Custom Increase Interval" />
            </FormGroup>
            {doesInterval && 
            <TextField
              id="increase-interval"
              label="Increase Interval"
              onChange={handleIncreaseIntervalChange}
              variant="outlined"
              size="small"
            />}

            <Button onClick={handleCreate}>Create</Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}