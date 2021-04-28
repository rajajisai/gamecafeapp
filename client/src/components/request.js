import React, { Component } from 'react';
import Button from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Navbar2 from './navbar2.js';
import axios from 'axios';
// import './request.css'
class Request extends Component {
      constructor(props) {
        super(props);
    
        this.state = { requests:[],
                       name:"",
                       wsname:"",
                       reqbody:"",
            };
      }
      componentDidMount() {
        const apiUrl = '/request/';
        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => this.setState({requests: data.slice(0)}));
      }
      removeRequest(r){
          console.log(r);
          console.log(r._id);
          axios.delete(` /request/${r._id}`)
      .then(res => {
        console.log(res);
        console.log(res.data);
        axios.get(` /request/`)
      .then(res => {
        const requests = res.data;
        this.setState({ requests:requests });
      })
      })
    }
    changeName(value){
      this.setState({
           name: value
      });
  }
  changewsName(value){
    this.setState({
         wsname: value
    });
}
  changeRequest(value){
    this.setState({
         reqbody: value
    });
}
    onSubmit = () => {
      console.log(this.state.name);
      console.log(this.state.wsname);
      console.log(this.state.reqbody);
      const newRequest ={
        wsname: this.state.wsname,
        reqbody: this.state.reqbody,
        requestedBy: this.state.name
      }
      axios.post(' /request/add',newRequest)
           .then(res => console.log(res.data));
           alert("Request Added!");
           axios.get(` /request/`)
           .then(res => {
             const requests = res.data;
             this.setState({ requests:requests });
           })
      }
    
      render() {
        var data=this.state.requests;

        return ( <div>
            <Navbar2 /> 
           
            <div>
        <ul id="removeBullets" className="productGrid flex-container wrap">
             {data.map((d) => {
             return(
            <li  className="flex-item ">
                <h3>{d.wsname}</h3>
                <p>{d.reqbody}</p>
                <h5>{d.requestedBy}</h5>
                <p>{d.createdAt.substring(0,10)}</p>
                <Button variant="success" onClick={() =>this.removeRequest(d)} className="btn-success">Mark as Resolved</Button>{' '}
            </li>)
        })}
        </ul>
        </div>
        </div>
    );
    }
}
 
export default Request;