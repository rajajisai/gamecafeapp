import React, { Component } from 'react';
import axios from 'axios';
import LogoutButton from './logoutbutton.js';
import { authenticate, isAuth ,signout,getCookie } from '../auth/helpers';
class Navbar extends Component {
   
    render() { 
        return ( <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">GamingZone</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Sign Up</a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="/signin">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/booking">Book Slots</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/custrequest">Make a Request</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profile">Profile</a>
                
              </li >
              <li className="nav-item">
                <LogoutButton/>
              </li>
            </ul>
          </div>
        </div>
      </nav> );
    }
}

export default Navbar;