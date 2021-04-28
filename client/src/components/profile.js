import React, { Component ,useContext,useState } from 'react';
import Navbar2 from './navbar2.js';
import axios from 'axios';
import AuthApi from '../utils/AuthApi';
import UserBooking from'./userbooking.js';
import LogoutButton from './logoutbutton.js';
import Navbar from './navbar.js';
import { authenticate, isAuth ,signout,getCookie } from '../auth/helpers';
import { useHistory } from 'react-router-dom';
import cookie from 'js-cookie';
import { alignPropType } from 'react-bootstrap/esm/DropdownMenu';
export default function Profile() {
    let history = useHistory();
    // const authApi = useContext(AuthApi);
    const cust = cookie.get('user');
    const mer = JSON.parse(localStorage.getItem('user'));
    console.log(cust)
    console.log(mer)
    console.log("Printing Email:",mer.email);
    const [email, setEmail] = useState(mer.email);
    const handleSignout = () => {
        // console.log("asd " + authApi.auth  
      signout(() => {
        axios.delete(' /customer/logout')
       .then(res => console.log(res.data));
       history.push('/signin')
      });
    };
    return (
      <div>
        <Navbar />
        <div style={{display: 'flex',  justifyContent:'center'}}>
        <h3>Hi {String(mer.name)}!!</h3>
          </div>

        
        <UserBooking userEmail={email}/>

      </div>
    );
  }