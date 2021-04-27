import React, { Component } from 'react';
import Button from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Navbar from './navbar.js';
import axios from 'axios';
class CustomerRequest extends Component {
    constructor(props) {
        super(props);
    
        this.state = { requests:[],
                       name:"",
                       wsname:"",
                       reqbody:"",
            };
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
      axios.post('http://localhost:5000/request/add',newRequest)
           .then(res => console.log(res.data));
           alert("Request Added!");
           axios.get(`http://localhost:5000/request/`)
           .then(res => {
             const requests = res.data;
             this.setState({ requests:requests });
           })
      }
    
      render() {
        var data=this.state.requests;
        // console.log(data[0]);
        return ( <div>
            <Navbar /> 
            <Form>
              <h5>Make a new request here:</h5>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Enter your name</Form.Label>
                <Form.Control value ={this.state.name} onChange={e => this.changeName(e.target.value)} type="name"  />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Enter PC/Console name</Form.Label>
                <Form.Control value ={this.state.wsname} onChange={e => this.changewsName(e.target.value)} type="name"  />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Enter your request</Form.Label>
                <Form.Control value ={this.state.reqbody} onChange={e => this.changeRequest(e.target.value)} as="textarea" rows={3} />
              </Form.Group>
              <Button variant="success" onClick={this.onSubmit} className="btn-success" type="submit">
                Submit
              </Button>
            </Form>
        </div>
    );
    }
}
 
export default CustomerRequest;