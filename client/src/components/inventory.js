import React, { Component } from 'react';
import './inventory.css';
import Navbar2 from './navbar2.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

class Inventory extends Component {
    constructor(props) {
        super(props);
    
        this.state = { systems:[],
            workstation:{}};
        this.bookSlot = this.bookSlot.bind(this);
      }
    //' /workstation'
     onDelete(d){
        console.log(d);
        console.log(d._id);
        axios.delete(` /workstation/${d._id}`)
    .then(res => {
      console.log(res);
      console.log(res.data);
       axios.get(` /workstation/`)
    .then(res => {
      const systems = res.data;
      this.setState({ systems:systems });
    })
    })
  }
    componentDidMount() {
        const apiUrl = ' /workstation/';
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => this.setState({systems: data.slice(0)}));
      }
      bookSlot(msg,num){
        //   this.setState({workstation:d});
        if(msg.slots[num].isBooked){alert("Slot not available");
        return}
        alert("Pay Rs."+msg.rent+" to confirm booking.")
        alert("Slot Booked!")
        console.log(typeof(num));
            console.log(msg.slots[num].isBooked);
            let msg1= msg;
            msg1.slots[num].isBooked=true;
            console.log(msg1);
            console.log(msg1._id);
            axios.post(' /workstation/update/'+msg1._id,msg1)
           .then(res => console.log(res.data));
      }
      onSubmit = () => {
        var name=document.getElementById("name").value
        var pic=document.getElementById("pic").value
        var type= document.getElementById("type").value
        var rent=document.getElementById("rent").value
        var date=document.getElementById("date").value
        if(!this.isValidDate(date)){
            alert("Enter the correct date in yyyy-mm-dd format   ");
            return;
        }
        if(name!=""&&type!=""&&rent!=""&&pic!="" ){
         
        const newRequest ={
          name: name,
          pic: pic,
          type: type,
            rent: Number(rent),
            date:date
        }
        axios.post(' /workstation/add',newRequest)
             .then(res => console.log(res.data));
             alert("Request Added!");
             axios.get(` /workstation/`)
             .then(res => {
               const systems = res.data;
               this.setState({ systems:systems  });
             })
            }else{
                alert("please enter name of workstation and type of workstation")
            }
        }
                isValidDate(dateString) {
            var regEx = /^\d{4}-\d{2}-\d{2}$/;
            if(!dateString.match(regEx)) return false;  // Invalid format
            var d = new Date(dateString);
            var dNum = d.getTime();
            if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
            return d.toISOString().slice(0,10) === dateString;
          }
    render() { 
        var data=this.state.systems;
        return (

                <div>
                <Navbar2 />
                <div class="contact-form" >
                <div class="textbox"><input type="text" placeholder="Name of workstation" id="name" /></div>
            

            <div class="textbox">
            <input type="text" placeholder="Type of workstation" id="type" />
            </div>
            <div class="textbox"><input type="text" placeholder="Date in YYYY-MM-DD format ONLY" id="date" /></div>
            <div class="textbox"><input type="text" placeholder="Url of picture of workstation" id="pic" /></div>
            <div class="textbox"><input type="text" placeholder="Rent" id="rent" /></div>
            
            <Button href="/inventory" onClick={this.onSubmit} className="btn" type="submit">Add system</Button>
            </div>
                <div style ={{position:"absolute", left:"80px", top:"700px"}}>
                <ul id="removeBullets" className="productGrid flex-container wrap"> 
                {/* <h3>This will be the Inventory page!</h3> */}
                {data.map((d) => {
             return(
            <li  className="flex-item ">
            <img className="" src={d.pic} />
                <div className="caption">
                    <h5 className="bolder">{d.name}</h5>
                    <p>Rs.{d.rent}/hr</p>
                </div>
                <DropdownButton id="dropdown-basic-button" title="Games Available">
                    {d.config.games.map((game) =>{
                        return(
                            <Dropdown.Item>{game}</Dropdown.Item>
                       )
                    })}
                </DropdownButton>
                <Button onClick={() =>this.onDelete(d)} className="btn">Delete Worktation</Button>
            </li>)
        })}</ul>
            </div>

            

            </div>
        );
    }
}
  
 
export default Inventory;