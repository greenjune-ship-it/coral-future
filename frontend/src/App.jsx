import React from 'react';
import Home from './pages/home.jsx'
import Login from './pages/login/login.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js'

/* You can element={<PrivateRoute><PageExample/></PrivateRoute>} on path. That way user can not have acces at path. He go to PageExample view */

function App() {
 return (
 <BrowserRouter>
<AuthProvider>
 <Routes>

    <Route exact path="/" element={<Home/>} />
    <Route exact path="/signin" element={<Login/>} />
    
 </Routes>
 </AuthProvider>
</BrowserRouter>
 );
}

/*  <BrowserRouter>
 <AuthProvider>
 <Routes>

    <Route exact path="/" element={<Home/>} />
    <Route exact path="/signin" element={<Login/>} />
    
 </Routes>
 </AuthProvider>
</BrowserRouter>
 );
}
*/

export default App;