// External imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// Internal imports
// Contexts
import AuthContextProvider from 'contexts/AuthContext'
// Pages
import Map from 'components/Map/Map';
// Components
import NavigationBar from 'components/Navbar/Navbar';
import InputSidebar from 'components/Sidebar/Sidebar';
import CustomerCart from 'pages/Map/CustomerCart';
import CustomerMap from 'pages/Map/CustomerMap';

const App = () => {

  return (
    <AuthContextProvider>
      <UserCartContextProvider>
        <Router>
          <div>
            {/* NavigationBar can be rendered on all routes */}
            <NavigationBar />
          </div>
          <Routes>
            <Route path='/map' element={<CustomerMap />} />
          </Routes>
          <Routes>
            <Route path="/cart" element={<CustomerCart />} />
          </Routes>
        </Router>
      </UserCartContextProvider>
    </AuthContextProvider>
  );
};

export default App;
