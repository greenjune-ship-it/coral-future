import React from 'react';
import Home from './pages/home.jsx'
import Login from './pages/login/login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
 return (
 <BrowserRouter>
 <Routes>
    <Route exact path="/" element={<Home/>} />
    <Route exact path="/signin" element={<Login/>} />
 </Routes>
</BrowserRouter>
 );
}

export default App;