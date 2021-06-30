//  useState Hook provides a way to simplify and rewrite the class component as a more readable function component
import React,{useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
export function LoginView(props){
  // useState() method is initial value of login variable,returns an array assigning current value to username,setUsername  variable a method to  update username variable.
  const[username,setUsername] = useState('');
  const[password,setPassword] = useState('');

// handleSubmit will log username and password into console
const handleSubmit = (e) =>{
  e.preventDefault();
  console.log(username,password);
   // allow users to be automatically logged in
   props.onLoggedIn(username); 
 
}
 return(
   <Container className="login-view" fluid="true">
   <Form>
     <Form.Group controlid='formUsername'>
     <Form.Label>Username:</Form.Label>
       <Form.Control type = 'text' value = {username} onChange = {e => setUsername(e.target.value)}/>
         </Form.Group>
      <Form.Group controlID='formPassword'>
       <Form.Label>Password:</Form.Label>
       <Form.Control type = "text" value = {password} onChange = {e => setPassword(e.target.value)} />
       </Form.Group>
       <button variant='primary' type='submit' onClick={handleSubmit}>Submit</button>
       <button variant='primary' type='button' onClick={props.toggleForms}>Register</button>
       </Form>
       </Container>
 )
}
LoginView.propTypes = {
  user: PropTypes.shape ({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
   onLoggedIn: PropTypes.func.isRequired
}