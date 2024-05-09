import { Button, Checkbox, Dialog, DialogActions, DialogContent, FormControlLabel, FormGroup, Stack, Switch, TextField, ThemeProvider, Typography } from "@mui/material"
import { mainTheme } from "../themes"
import React from "react"
import { getAuth } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../FireBase"

export const NewCounterPopup = ({name, getProject}: {name: string, getProject: () => void}) => {
  const auth = getAuth();

  const [open, setOpen] = React.useState<boolean>(false);
  const [counterName, setCounterName] = React.useState<string>("");
  const [linkedToGlobal, setLinkedToGlobal] = React.useState<boolean>(true);
  const [resetNumber, setResetNumber] = React.useState<string>("");

  const handleOpen = () => {
    console.log("open");
    setOpen(true);
  }

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  }
  
  const handleCreate = async() => {
    try {
      if (auth.currentUser) {
        const reset = parseInt(resetNumber);
        if (isNaN(reset)) { 
          console.log("not a number");
          alert("Error: reset number is not a number.")
        }
        else {
          const newCounter = {name: counterName, count: 0, linkedToGlobal: linkedToGlobal, resetAt: reset};
          const counterDoc = doc(db, 'users', auth.currentUser.uid, 'projects', name, 'secondaryCounters', counterName);
          await setDoc(counterDoc, newCounter, {merge: true});
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

  const handleResetAtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResetNumber(event.target.value);
  }

  const handleLinkedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLinkedToGlobal(event.target.checked);
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Button onClick={handleOpen}>Add New Counter</Button>

      <Dialog open={open} onClose={handleClose} >
        <DialogContent sx={{backgroundColor: '#E9EBF8'}}>
          <Stack>
            <Typography>Create New Counter</Typography>
            <TextField 
              id="counter-name"
              label="Name"
              onChange={handleNameChange}
              variant="standard"
            />
            <TextField
              id="reset-at"
              label="Reset Counter At"
              onChange={handleResetAtChange}
              variant="standard"
            />
            <FormGroup>
              {/* <FormControlLabel control={<Checkbox />} label="Link with primary counter" /> */}
              <FormControlLabel control={<Switch checked={linkedToGlobal} onChange={handleLinkedChange}/>} label="Link with primary counter" />
            </FormGroup>
          </Stack>
        </DialogContent>
        <DialogActions sx={{backgroundColor: '#E9EBF8'}}>
          <Button onClick={handleCreate}>Create</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </ThemeProvider>
  )
}