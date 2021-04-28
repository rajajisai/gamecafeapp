import React, { Component ,useContext,useState} from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import './style.css';
import GoogleButton from 'react-google-button'
import 'bootstrap/dist/css/bootstrap.min.css';
// import AuthApi from '../utils/AuthApi';

import { authenticate, isAdmin, isAuth } from '../auth/helpers';

export default function LoginForm({ history }) {
  // const authApi = useContext(AuthApi)
  const [values, setValues] = useState({
    email: '',
    name: ''
});
  const handleLogin = (response) =>{
    console.log(  );
    console.log(response.profileObj);
    console.log(response.profileObj.email);
    const customer = {
      name: response.profileObj.name,
      email: response.profileObj.email
    }
    axios.post(' /customer/glogin',customer)
       .then(res => console.log(res.data));
       alert("Logged In!")
       authenticate(response,customer, () => {
        setValues({ ...values, name: '', email: '' });

        if(isAdmin()){
          history.push('/dashboard')
        }else{
          history.push('/booking')
        }
      });

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
        <input type="button" class="btn" value="Sign in" /> 

        <GoogleLogin 
        render={renderProps => (
          <GoogleButton style={{ width: "100%",justifyContent:"center"}} onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>
        )}
        clientId ="204064659282-mu672f9s1mdp5n3l68shedq6kba102kr.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={'single_host_origin'}
        />  
       
    </div>

);
} 
