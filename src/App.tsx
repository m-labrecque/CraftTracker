import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>   
            <Route path='/' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
