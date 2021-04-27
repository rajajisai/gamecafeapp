import React, { Component } from 'react';
class UserBooking
 extends Component {
    constructor(props) {
        super(props);
        this.state = { customer:{},slots: []};
      }
    componentDidMount(){
        console.log("Printing email from parent"+this.props.userEmail);
        const newemail=this.props.userEmail
        const apiUrl = 'http://localhost:5000/customer/';
        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => this.setState({customer: data.slice(0).filter(function(obj){return obj.email==newemail })[0],slots:data.slice(0).filter(function(obj){return obj.email==newemail })[0].slotsBooked},() => {
            console.log(this.state.customer,this.state.slots, 'dealersOverallTotal1');
          }));
          console.log(this.state.customer.name)
          console.log(this.state.customer.email)
    }
    render() {
        var data = this.state.slots;
        return (<div>
                    <h>Hi {this.state.customer.name}</h>
                    <p>Your email is {this.state.customer.email}</p>
                    <h4>Your Bookings:</h4>
                    {/* <p>{this.state.customer}</p> */}
                    <div>
                        <ul id="removeBullets" className="productGrid flex-container wrap">
                            {data.map((d) => {
                            return(
                                <li  className="flex-item ">
                                    <div className="caption">
                                        <h5 className="bolder">{d.workstation}</h5>
                                    <p>Date: {d.date}</p>
                                    <p>Slot at: {d.time}</p>
                                    <p>Slot Duation: 1hr</p>
                                    </div>
                                </li>)
                            })}
                        </ul>
                    </div>
                </div>  
                );
    }
}
 
export default UserBooking
;