import React, { Component ,useContext,useState} from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import AuthApi from '../utils/AuthApi';

import { authenticate, isAuth } from '../auth/helpers';

// class LoginForm extends Component {
  
    // handleLogin = (response) =>{
    //     console.log(response);
    //     console.log(response.profileObj);
    //     console.log(response.profileObj.email);
    //     const customer = {
    //       name: response.profileObj.name,
    //       email: response.profileObj.email
    //     }
    //     axios.post('http://localhost:5000/customer/add',customer)
    //        .then(res => console.log(res.data));
    //        alert("Logged In!")
    //   }
    
    // handleSignin = (response) =>{
    //   authApi.setAuth(true);
    //   }
//     render() { 
//         return (
//                 <div class="contact-form">
//                     <h1>Login</h1>
//                     <div class="textbox">
// 	                    <i class="fas fa-user"></i>
// 	                    <input type="text" placeholder="Username"/>
// 	                </div>
//                     <div class="textbox">
// 	                    <i class="fas fa-lock"></i>
// 	                    <input type="password" placeholder="Password"/>
// 	                </div>
//                     <input onClick = {this.handleSignin} type="button" class="btn" value="Sign in" />

//                     <GoogleLogin
//                     clientId ="204064659282-mu672f9s1mdp5n3l68shedq6kba102kr.apps.googleusercontent.com"
//                     buttonText="Login"
//                     onSuccess={this.handleLogin}
//                     onFailure={this.handleLogin}
//                     cookiePolicy={'single_host_origin'}
//                     />  
                   
//                 </div>

//           );
//     }
// }
export default function LoginForm2({ history }) {
  // const authApi = useContext(AuthApi)
  const [values, setValues] = useState({
    email: '',
    name: ''
});
  const handleLogin = (response) =>{
    console.log(response);
    console.log(response.profileObj);
    console.log(response.profileObj.email);
    const customer = {
      name: response.profileObj.name,
      email: response.profileObj.email
    }
    axios.post('http://localhost:5000/customer/glogin',customer)
       .then(res => console.log(res.data));
       alert("Logged In!")
       authenticate(response,customer, () => {
        setValues({ ...values, name: '', email: '' });
        // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
        history.push('/dashboard')
        //isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
        
      });
      //  authApi.setAuth(true);
  }

const handleSignin = (response) =>{
    // console.log(response);
    
    // const customer = {
    //   name: response.profileObj.name,
    //   email: response.profileObj.email
    // }
    // axios.post('http://localhost:5000/customer/add',customer)
    //    .then(res => console.log(res.data));
    //    alert("Logged In!")
  
  }
  return (
    <div class="contact-form">
        <h1>Login</h1>
        <div class="textbox">
          <i class="fas fa-user"></i>
          <input type="text" placeholder="Username"/>
      </div>
        <div class="textbox">
          <i class="fas fa-lock"></i>
          <input type="password" placeholder="Password"/>
      </div>
        <input onClick = {handleSignin()} type="button" class="btn" value="Sign in" />

        <GoogleLogin
        clientId ="204064659282-mu672f9s1mdp5n3l68shedq6kba102kr.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
        />  
       
    </div>

);
} 
// export default LoginForm;