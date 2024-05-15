import { Box, Container, Grid, IconButton, Paper, Stack, ThemeProvider, Typography } from "@mui/material"
import { mainTheme } from "../themes"
import React from "react";
import { useLocation } from "react-router-dom";
import { Counter, Project } from "../AppBaseTypes";
import { DocumentReference, collection, doc, getDoc, getDocs, increment, updateDoc } from "firebase/firestore";
import { db } from "../FireBase";
import { getAuth } from "firebase/auth";
import { Header } from "../headers/Header";
import { AddCircleOutlineRounded, RemoveCircleOutlineRounded } from "@mui/icons-material";
import { NewCounterPopup } from "../projectComponents/NewCounterPopup";
import { SecondaryCounter } from "../projectComponents/SecondaryCounter";


export const ProjectCounters = () => {  
  const location = useLocation();
  const auth = getAuth();

  const [currentProject, setCurrentProject] = React.useState<Project>();
  const [primaryCounter, setPrimaryCounter] = React.useState<number>(0);
  const [secondaryCounters, setSecondaryCounters] = React.useState<Counter[]>([]);
  const projectName = location.state?.projectName || "";
  const pieceName = location.state?.pieceName || "";

  function getProjectOrPiece(): DocumentReference {
    console.log("project or piece");
    console.log(pieceName);
    if (pieceName === "") {
      console.log("single");
      return doc(db, 'users', auth.currentUser?.uid || "", 'projects', projectName);
    }
    else {
      console.log("multiple");
      return doc(db, 'users', auth.currentUser?.uid || "", 'projects', projectName, 'pieces', pieceName);
    }
  }

  const getProject = async() => {
    try {
      if (auth.currentUser) {
        console.log("get project")
        const projectDoc = getProjectOrPiece();
        const projectSnap = await getDoc(projectDoc);
        const data = projectSnap.data();
        console.log("got project data");

        if (data) {
          setCurrentProject({name: data.name, mainCounterCount: data.mainCounterCount, multiPiece: data.multiPiece});
          setPrimaryCounter(data.mainCounterCount);
          console.log("set all data for project counters");

          const counterDoc = collection(projectDoc, 'secondaryCounters');
          const snapShot = await getDocs(counterDoc);
          
          let c: Counter[] = [];
          snapShot.forEach((i) => {
            const data = i.data();
            c.push({name: data.name, count: data.count, linkedToGlobal: data.linkedToGlobal, doesReset: data.doesReset, 
                    resetAt: data.resetAt, doesInterval: data.doesInterval, increaseInterval: data.increaseInterval, sinceLastIncrease: data.sinceLastIncrease});
          });
          setSecondaryCounters(c);
          console.log("got counters");
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  React.useEffect(() => {
    getProject();
  }, []);

  const increasePrimary = async() => {
    try {
      if (auth.currentUser) {
        const projectDoc = doc(db, 'users', auth.currentUser.uid, 'projects', projectName);
        await updateDoc(projectDoc, {mainCounterCount: increment(1)});

        const counterDoc = collection(projectDoc, 'secondaryCounters');
        const snapShot = await getDocs(counterDoc);

        const promises = snapShot.docs.map(async(i) => {
          const c = i.data();
          if (c.linkedToGlobal) {
            const cDoc = doc(counterDoc, c.name);
            
            if (c.doesInterval) {
              if (c.sinceLastIncrease === c.increaseInterval-1) {
                if (c.doesReset) {
                  if (c.count === c.resetAt) {
                    await updateDoc(cDoc, {count: 1, sinceLastIncrease: 0});
                  }
                  else {
                    await updateDoc(cDoc, {count: increment(1), sinceLastIncrease: 0});
                  }
                }
                else {
                  await updateDoc(cDoc, {count: increment(1), sinceLastIncrease: 0});
                }
              }
              else {
                await updateDoc(cDoc, {sinceLastIncrease: increment(1)});
              }
            }
            else {
              if (c.doesReset) {
                if (c.count === c.resetAt) {
                  await updateDoc(cDoc, {count: 1});
                }
                else {
                  await updateDoc(cDoc, {count: increment(1)});
                }
              }
              else {
                await updateDoc(cDoc, {count: increment(1)});
              }
            }
          }
        });

        await Promise.all(promises);
        getProject();
      }
      console.log("increase primary");
    } catch (e) {
      console.log(e);
    }
  }

  const decreasePrimary = async() => {
    try {
      if (auth.currentUser) {
        const projectDoc = doc(db, 'users', auth.currentUser.uid, 'projects', projectName);
        const projectSnap = await getDoc(projectDoc);
        const projectData = projectSnap.data();
        if (projectData?.mainCounterCount === 0) {
          alert("Error: cannot decrease a counter that is already at 0.");
        }
        else {
          await updateDoc(projectDoc, {mainCounterCount: increment(-1)});
          
          const counterDoc = collection(projectDoc, 'secondaryCounters');
          const snapShot = await getDocs(counterDoc);

          const promises = snapShot.docs.map(async(i) => {
            const c = i.data();
            if (c.linkedToGlobal) {
              const cDoc = doc(counterDoc, c.name);
              
              if (c.doesInterval) {
                if (c.sinceLastIncrease === 0) {
                  if (c.doesReset) {
                    if (c.count === 1) {
                      await updateDoc(cDoc, {count: c.resetAt, sinceLastIncrease: c.increaseInterval-1});
                    }
                    else {
                      await updateDoc(cDoc, {count: increment(-1), sinceLastIncrease: c.increaseInterval-1});
                    }
                  }
                  else {
                    await updateDoc(cDoc, {count: increment(-1), sinceLastIncrease: c.increaseInterval-1});
                  }
                }
                else {
                  await updateDoc(cDoc, {sinceLastIncrease: increment(-1)});
                }
              }
              else {
                if (c.doesReset) {
                  if (c.count === 1) {
                    await updateDoc(cDoc, {count: c.resetAt});
                  }
                  else {
                    await updateDoc(cDoc, {count: increment(-1)});
                  }
                }
                else {
                  await updateDoc(cDoc, {count: increment(-1)});
                }
              }
            }
          });

          await Promise.all(promises);
          getProject();
        }
      }
      console.log("decrease primary");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <ThemeProvider theme={mainTheme}>
      <Box sx={{display: "flex"}}>
        <Header/>
        <Box marginTop={10} sx={{ height: '100vh'}}>
          <Container>
            <Typography>{projectName} {pieceName && " - " + pieceName}</Typography>
            <Grid container spacing={2} alignItems="center">
              {/* primary counter */}
              <Grid item xs={12}>
                <Paper sx={{backgroundColor: "#E9EBF8"}}>
                  <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={2}
                  >
                    <IconButton size="large" color="primary" sx={{fontSize: '4.5rem'}} onClick={decreasePrimary}>
                      <RemoveCircleOutlineRounded fontSize="inherit"/>
                    </IconButton>
                    <Typography variant="h4">{primaryCounter}</Typography>
                    <IconButton size="large" color="primary" sx={{fontSize: '4.5rem'}} onClick={increasePrimary}>
                      <AddCircleOutlineRounded fontSize="inherit"/>
                    </IconButton>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12}>
              {/* all the other counters (the counters linked to the main counter) */}
                <Grid container spacing={2}>
                  {secondaryCounters.map((c) => (
                    <SecondaryCounter name={c.name} count={c.count} projectName={projectName}/>
                  ))}
                </Grid>
              </Grid>
            </Grid>
            <NewCounterPopup name={projectName} pName={pieceName} getProject={getProject}/>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}