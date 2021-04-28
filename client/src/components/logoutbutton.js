
import React, { Component ,useContext,useState } from 'react';
import Navbar2 from './navbar2.js';
import axios from 'axios';
import AuthApi from '../utils/AuthApi';
import UserBooking from'./userbooking.js';

import { authenticate, isAuth ,signout,getCookie } from '../auth/helpers';
import { useHistory } from 'react-router-dom';
import cookie from 'js-cookie';
export default function LogoutButton() {
    let history = useHistory();

    const cust = cookie.get('user');
    const mer = JSON.parse(localStorage.getItem('user'));
    console.log(cust)
    console.log(mer)
    console.log("Printing Email:",mer.email);
    const [email, setEmail] = useState(mer.email);
    const handleSignout = () => {

      signout(() => {
        axios.delete(' /customer/logout')
       .then(res => console.log(res.data));
       history.push('/signin')
      });
    };
    return (
         <a className="nav-link" onClick={handleSignout}>Logout</a>

        
    );
  }
 
