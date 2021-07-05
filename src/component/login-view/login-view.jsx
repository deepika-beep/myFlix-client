//  useState Hook provides a way to simplify and rewrite the class component as a more readable function component
import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container  from 'react-bootstrap/Container';
// When a user clicks on the submit button, you need to update your handleSubmit method, where you’ll make a POST request to the login endpoint using Axio
import axios from 'axios';
export function LoginView(props){
  // useState() method is initial value of login variable,returns an array assigning current value to username,setUsername  variable a method to  update username variable.
  
  const[username,setUsername] = useState('');
  const[password,setPassword] = useState('');

// handleSubmit will log username and password into console
const handleSubmit = (e) =>{
  e.preventDefault();
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
   <Container className="login-view" fluid="true">
   <Form>
     <Form.Group controlId='formUsername'>
     <Form.Label>Username:</Form.Label>
       <Form.Control type = 'text' value = {username} onChange = {e => setUsername(e.target.value)}/>
         </Form.Group>
      <Form.Group controlId='formPassword'>
       <Form.Label>Password:</Form.Label>
       <Form.Control type = "text" value = {password} onChange = {e => setPassword(e.target.value)} />
       </Form.Group>
      
       <button variant='primary' type='submit' onClick={handleSubmit}>Submit</button>
       <button variant='primary' type='button' onClick={props.toggleForms}>Register</button>
       
       </Form>
       </Container>
 )
}
