
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
        axios.delete('http://localhost:5000/customer/logout')
       .then(res => console.log(res.data));
       history.push('/signin')
      });
    };
    return (
         <button onClick={handleSignout}>Logout</button>
        // <Button imageUrl="https://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png">Image icon</Button>
        // <button><img src='./img/1.png'  onClick={handleSignout} /></button>
        
    );
  }
 
