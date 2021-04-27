import React, { Component, useState } from 'react';
import Navbar from './components/navbar.js';
import Booking from './components/booking.js';
import Dashboard from './components/dashboard.js';
import './App.css';
import LoginForm from './components/loginform.js';
import Inventory from './components/inventory.js';
import Staff from './components/staff.js'
import Request from './components/request.js'
import SignUpForm from './components/signupform.js';
import GoogleLogin from 'react-google-login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Routes from './routes/Routes';
import AuthApi from './utils/AuthApi';

function App() {
  const [auth, setAuth] = useState(false); 
  
  return (
    <AuthApi.Provider value={{ auth, setAuth }}>
    <Router>
      <div>
        {/* <Navbar /> */}
        {/* <LoginForm />
        <SignUpForm /> */}
        <Routes/>
        
      </div>
    </Router>
    </AuthApi.Provider>
  );
  
}
export default App;