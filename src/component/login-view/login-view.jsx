//  useState Hook provides a way to simplify and rewrite the class component as a more readable function component
import React,{useState} from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

// When a user clicks on the submit button, you need to update your handleSubmit method, where you’ll make a POST request to the login endpoint using Axio
import axios from 'axios';
import './login-view.scss';
export function LoginView(props){
  // useState() method is initial value of login variable,returns an array assigning current value to username,setUsername  variable a method to  update username variable.
  
  const[username,setUsername] = useState('');
  const[password,setPassword] = useState('');
  const[validateUser,setValidateUser]=useState('');
  const[validatePassword,setValidatePassword]=useState('');
  const[warning,setWarning]=useState('');

  // Validate Username
  const validateUsername =(e)=> {
    if(e.target.value.length > 0 && e.target.value.length < 6){
      setValidateUser('Username should be more than 6 charecters');
    }
    else{
      setValidateUser('');
    }
    if(!e.currentTarget.value.match(/^[A-Za-z0-9]+$/) && e.target.value.length > 0){
      setValidateUser('Only alphanumeric charecters allowed');
    }
  } 

  // Validate Password
  const validatePwd =(e)=>{
    if(e.target.value.length >0 && e.target.value.length <8){
      setValidatePassword('Password should be longer than 8 charecters');
    }
    else{
      setValidatePassword('');
    }

  }
// handleSubmit will log username and password into console
const handleSubmit = (e) =>{
  e.preventDefault();

  // avoid submission of empty input
  if(username.length===0){
    setWarning('you should enter a name');
    return false
  }
  if(password.length === 0){
    setWarning('You should enter a password');
    return false
  }

  // avoid incorrect credentials
  if(validateUser || validatePassword){
    if(validateUser){
      setWarning('Incorrect username');
      return false
    }
    if(validatePassword){
      setWarning('Incorrect password');
      return false
    }
  }
  // send request to server for authentication
  // props.onLoggedIn(username) has been changed to props.onLoggedIn(data) because we need the token as well as the username.
  // when a user clicks on the submit button of the login form, a POST request is made to the login endpoint of your myFlix API using Axios.
  axios.post('https://myflix-movies-api.herokuapp.com/login',{
    Username:username,
    Password:password
  })
  .then(response =>{
    const data = response.data;
    props.onLoggedIn(data);
  })
  .catch(e => {
    console.log('no such user');
  });
  // console.log(username,password);
  //  allow users to be automatically logged in
  //  props.onLoggedIn(username); 
 
};
 return(
   <>
   <Navbar bg='dark' variant='dark'>
       <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
   </Navbar>

   <Form>
     <Form.Group controlId='formUsername'>
     <Form.Label>Username:</Form.Label>
       <Form.Control type = 'text' value = {username} onChange = {e => setUsername(e.target.value),validateUsername(e)}/>
         </Form.Group>
      <Form.Group controlId='formPassword'>
       <Form.Label>Password:</Form.Label>
       <Form.Control type = "text" value = {password} onChange = {e => setPassword(e.target.value),validatePassword(e)} />
       </Form.Group>
      
       <Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
       <Form.Text className="text-muted">
                No account yet? Create one <Link to={`/register`}>Register</Link>
            </Form.Text>
       <div className="warning">{warning}</div>
       </Form>
        </>
      
 )
}
LoginView.PropTypes = {
  onLoggedIn:PropTypes.func.isRequired
}