import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectHome } from './pages/ProjectHome';
import { ProjectCounters } from './pages/ProjectCounters';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>   
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/projecthome' element={<ProjectHome />} />
            <Route path='/projectcounters' element={<ProjectCounters />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
