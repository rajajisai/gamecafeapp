import React, { Component } from 'react';
import axios from 'axios';
import LogoutButton from './logoutbutton.js';
import { authenticate, isAuth ,signout,getCookie } from '../auth/helpers';
class Navbar2 extends Component {
  
    render() { 
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">GamingZone</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" aria-current="page" href="/dashboard">Bookings</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/inventory">Inventory</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/stats">Stats</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/requests">Requests</a>
                  </li>
                  <li className="nav-item">
                <LogoutButton/>
              </li>
                  
                </ul>
              </div>
            </div>
          </nav> );
    }
}

export default Navbar2;