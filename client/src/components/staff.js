import React, { Component } from 'react';
import Navbar2 from './navbar2.js';
import Dashboard from './dashboard.jsx';
class Staff extends Component {
    state = {  }
    render() { 
        return (
            <div>
                <Navbar2 />
                <div style={{display: 'flex',  justifyContent:'center'}}>
                <Dashboard/>
                </div>
            </div>
        );
    }
}
 
export default Staff;