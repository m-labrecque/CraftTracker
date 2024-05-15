import { ThemeProvider } from "@emotion/react"
import { mainTheme } from "../themes"
import { Box, Button, Dialog, DialogContent, Grid, IconButton, Paper, Stack, TextField, Typography } from "@mui/material"
import { Header } from "../headers/Header"
import { useLocation, useNavigate } from "react-router-dom"
import { getAuth } from "firebase/auth"
import { db } from "../FireBase"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { ChangeEvent, useEffect, useState } from "react"
import { Piece } from "../AppBaseTypes"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';


export const ProjectPieces = () => {
  const location = useLocation();
  const auth = getAuth();
  const navigate = useNavigate();

  const projectName = location.state?.projectName;
  const [pieces, setPieces] = useState<Piece[]>([]);

  const getProject = async() => {
    try {
      if (auth.currentUser) {
        const projectDoc = doc(db, 'users', auth.currentUser.uid, 'projects', projectName);
        const projectSnap = await getDoc(projectDoc);
        const data = projectSnap.data();

        if (data) {
          const piecesDoc = collection(projectDoc, 'pieces');
          const pieceSnap = await getDocs(piecesDoc);

          let p: Piece[] = [];
          pieceSnap.forEach((i) => {
            const d = i.data();
            p.push({name: d.name, mainCounterCount: d.mainCounterCount});
          });
          setPieces(p);
          console.log("got pieces");
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getProject();
  }, []);

  const [open, setOpen] = useState<boolean>(false);
  const [newPieceName, setNewPieceName] = useState<string>("");

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleCreate = async() => {
    console.log("create");
    if (newPieceName.length === 0) {
      alert("Error: piece name cannot be empty");
    }
    else {
      if (auth.currentUser) {
        const newPiece = {name: newPieceName, mainCounterCount: 0};

        const piecesDoc = doc(db, "users", auth.currentUser.uid, "projects", projectName, "pieces", newPieceName);
        await setDoc(piecesDoc, newPiece, {merge: true});

        setNewPieceName("");

        getProject();
        setOpen(false);
      }
    }
  }

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPieceName(event.target.value);
  }

  const gotoCounters = (n: string) => {
    console.log(n);
    navigate('/projectcounters', {state: {projectName: projectName, pieceName: n}})
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Box sx={{display: "flex"}}>
        <Header/>
        <Box marginTop={10} sx={{height: '100vh'}}>
          <Typography>Project Pieces</Typography>
          <Grid container spacing={1}>
            {pieces.map((p) => (
              <Grid key={p.name} item xs={12} sm={6}>
                <Paper sx={{p: 2, backgroundColor: '#E9EBF8'}}>
                  <Button onClick={() => gotoCounters(p.name)}>{p.name}</Button>
                </Paper>  
              </Grid>
            ))}
          </Grid>
          <Button onClick={handleOpen}>Add New Piece</Button>

          <Dialog open={open} onClose={handleClose}>
            <DialogContent sx={{backgroundColor: '#E9EBF8'}}>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography paddingTop="3px">Create New Piece</Typography>
                  <IconButton size="small" onClick={handleClose}>
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                </Stack>
                <TextField 
                  id="new-piece-name"
                  label="Piece Name"
                  onChange={handleNameChange}
                  variant="outlined"
                  size="small"
                />
                <Button onClick={handleCreate}>Create</Button>
              </Stack>
            </DialogContent>
          </Dialog>

        </Box>
      </Box>
    </ThemeProvider>
  )
}