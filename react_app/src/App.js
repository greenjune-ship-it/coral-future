// External imports
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// Internal imports
// Contexts
import AuthContextProvider from 'contexts/AuthContext'
import UserCartContextProvider from 'contexts/UserCartContext';
// Pages
import CustomerCart from 'pages/Cart/CustomerCart';
import CustomerMap from 'pages/Map/CustomerMap';
// Components
import NavigationBar from 'components/Navbar/Navbar';


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
