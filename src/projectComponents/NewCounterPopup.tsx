import { Button, Checkbox, Dialog, DialogActions, DialogContent, FormControlLabel, FormGroup, Stack, Switch, TextField, ThemeProvider, Typography } from "@mui/material"
import { mainTheme } from "../themes"
import React from "react"
import { getAuth } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../FireBase"

export const NewCounterPopup = ({name}: {name: string}) => {
  const auth = getAuth();

  const [open, setOpen] = React.useState<boolean>(false);
  const [counterName, setCounterName] = React.useState<string>("");
  const [linkedToGlobal, setLinkedToGlobal] = React.useState<boolean>(false);
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
          const newCounter = {Name: counterName, Count: 0, linkedToGlobal: linkedToGlobal, resetAt: reset};
          const counterDoc = doc(db, 'users', auth.currentUser.uid, 'projects', name, 'secondaryCounters', counterName);
          await setDoc(counterDoc, newCounter, {merge: true});
          console.log("create");
          setOpen(false);
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

  return (
    <ThemeProvider theme={mainTheme}>
      <Button onClick={handleOpen}>Add Secondary Counter</Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Stack>
            <Typography>{name}</Typography>
            <TextField 
              id="counter-name"
              label="Name"
              onChange={handleNameChange}
              variant="standard"
            />
            <TextField
              id="reset-at"
              label="reset counter at"
              onChange={handleResetAtChange}
              variant="standard"
            />
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Link with primary counter" />
              <FormControlLabel control={<Switch />} label="which one is better" />
            </FormGroup>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreate}>Create</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

    </ThemeProvider>
  )
}