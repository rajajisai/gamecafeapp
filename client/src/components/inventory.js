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
            workstation:{},
        date:""};
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
        let date=new Date();
        console.log(date.toISOString().slice(0, 10));
        const apiUrl = ' /workstation/';
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => this.setState({systems: data.slice(0).filter(function(obj){return obj.date==date.toISOString().slice(0, 10) })}));
          this.setState({date:date.toISOString().slice(0, 10)})
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
        var rent=document.getElementById("rent").value
        var date=document.getElementById("date").value
        if(!this.isValidDate(date)){
            alert("Enter the correct date in yyyy-mm-dd format   ");
            return;
        }
        if(name!=""&&rent!=""&&pic!="" ){
         
        const newRequest ={
          name: name,
          pic: pic,

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
                alert("please enter name of workstation ,type of workstation and pic")
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
          toDate(date){
            const apiUrl = ' /workstation/';
            fetch(apiUrl)
              .then((response) => response.json())
              .then((data) => this.setState({systems: data.slice(0).filter(function(obj){return obj.date==date })}));
              this.setState({date:date})
    
          }
    render() { 
        var data=this.state.systems;
        var date1=new Date();
        var date2=new Date();
        date2.setDate(date1.getDate()+1);
        var date3=new Date();
        date3.setDate(date1.getDate()+2);
        var date4=new Date();
        date4.setDate(date1.getDate()+3);
        var date5=new Date();
        date5.setDate(date1.getDate()+4);
        var date6=new Date();
        date6.setDate(date1.getDate()+5);
        var date7=new Date();
        date7.setDate(date1.getDate()+6);
        // console.log(data[0]);
        return ( <div>

            <Navbar2 />

                <div class="contact-form" >
                <div class="textbox"><input type="text" placeholder="Name of workstation" id="name" /></div>
            
            <div class="textbox"><input type="text" placeholder="Date in YYYY-MM-DD format" id="date" /></div>
            <div class="textbox"><input type="text" placeholder="Url of picture of workstation" id="pic" /></div>
            <div class="textbox"><input type="text" placeholder="Per hour rent rate" id="rent" /></div>
            <Button href="/inventory" onClick={this.onSubmit} className="btn" type="submit">Add system</Button>
            </div>
            {/* <Navbar /> */}
            <div style ={{position:"absolute", left:"80px", top:"600px"}}>
            <DropdownButton style={{width:"11.5%",margin:"10px 27px"}} id="dropdown-basic-button" title={this.state.date}>
        <Dropdown.Item  onClick={() =>this.toDate(date1.toISOString().slice(0, 10))} className = {'green-color'}>{date1.toISOString().slice(0, 10)}</Dropdown.Item>
        <Dropdown.Item  onClick={() =>this.toDate(date2.toISOString().slice(0, 10))}  className = {'green-color'}>{date2.toISOString().slice(0, 10)}</Dropdown.Item>
        <Dropdown.Item  onClick={() =>this.toDate(date3.toISOString().slice(0, 10))}  className = {'green-color'}>{date3.toISOString().slice(0, 10)}</Dropdown.Item>
        <Dropdown.Item  onClick={() =>this.toDate(date4.toISOString().slice(0, 10))}  className = {'green-color'}>{date4.toISOString().slice(0, 10)}</Dropdown.Item>
        <Dropdown.Item  onClick={() =>this.toDate(date5.toISOString().slice(0, 10))}  className = {'green-color'}>{date5.toISOString().slice(0, 10)}</Dropdown.Item>
        <Dropdown.Item  onClick={() =>this.toDate(date6.toISOString().slice(0, 10))}  className = {'green-color'}>{date6.toISOString().slice(0, 10)}</Dropdown.Item>
        <Dropdown.Item  onClick={() =>this.toDate(date7.toISOString().slice(0, 10))}  className = {'green-color'}>{date7.toISOString().slice(0, 10)}</Dropdown.Item>
        </DropdownButton>

            <div>
        <ul id="removeBullets" className="productGrid flex-container wrap">
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
                {/* <button onClick={() =>this.bookSlot(d)}>Testing</button> */}
                
            </li>)
        })}
        </ul>
        </div>
        </div>
        </div>

    );
    }
  
}
  
 
export default Inventory;