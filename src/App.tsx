import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { Home } from './pages/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>   
            <Route path='/' element={<SignIn />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
