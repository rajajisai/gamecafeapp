import React, { Component } from 'react';

class SignUpForm extends Component {
        constructor(props) {
            super(props);
        
            this.state = {
              customer: {
                name: props.name,
                email: props.email,
                phone: props.phone,
                username: props.username,
                password: props.password
              }
            }
        }
        handleNameChanged(event) {
            var customer        = this.state.customer;
            customer.name  = event.target.value;
        
            this.setState({ customer: customer });
          }
        handleEmailChanged(event) {
            var customer        = this.state.customer;
            customer.email  = event.target.value;
        
            this.setState({ customer: customer });
          }
        handlePhoneChanged(event) {
            var customer        = this.state.customer;
            customer.phone  = event.target.value;
        
            this.setState({ customer: customer });
          }
        handleUsernameChanged(event) {
            var customer        = this.state.customer;
            customer.username  = event.target.value;
        
            this.setState({ customer: customer });
          }
        handlePasswordChanged(event) {
            var customer        = this.state.customer;
            customer.password  = event.target.value;
        
            this.setState({ customer: customer });
          }
        handleButtonClicked() {
            console.log("Button clicked");
            console.log(this.state.customer);
          }
    render() {
        return ( <form>
            <h3>Register</h3>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="name" value = {this.state.customer.name} onChange={this.handleNameChanged.bind(this)} className="form-control" id="name" />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" value = {this.state.customer.email} onChange={this.handleEmailChanged.bind(this)} className="form-control" id="email" />
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="phone" value = {this.state.customer.phone} onChange={this.handlePhoneChanged.bind(this)} className="form-control" id="phone" />
            </div>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input type="username" value = {this.state.customer.username} onChange={this.handleUsernameChanged.bind(this)} className="form-control" id="username" />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" value = {this.state.customer.password} onChange={this.handlePasswordChanged.bind(this)} className="form-control" id="password" />
            </div>
            <button type="submit" onClick={this.handleButtonClicked.bind(this)} className="btn btn-primary">Submit</button>
        </form> );

    }
}
 
export default SignUpForm;