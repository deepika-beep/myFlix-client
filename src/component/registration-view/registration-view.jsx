import React, { useState } from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from "react-bootstrap/Navbar";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import './registration-view.scss';
export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
// Validating states
  const [validateUser,setValidateUser] = useState('');
  const [validatePassword,setValidatePassword] = useState('');
  const [validateEmail,setValidateEmail] = useState('');
  const [validateDate,setValidateDate] = useState('');
  const [warning, setWarning] = useState('');

  // Validating username
  const validateUsername =(e)=>{
    if(e.target.value.length > 0 && e.target.value.length <5){
      setValidateUser('Username must be longer than 5 characters');
    }
    else{
      setValidateUser('User');
    }
    if(!e.currentTarget.value.match(/^[0-9a-zA-Z]+$/) && e.target.value.length >0){
      setValidateUser('only alphanumeric charecters allowed');
    }
  }
  // Validating pASSWORD
  const validatePwd =(e)=>{
    if(e.target.value.length >0 && e.target.value.length<8){
      setValidatePassword('Password must be longer than 8 characters');
    }else
    {
      setValidatePassword('');
    }
  }
  // Validating email
  const validateMail =(e)=>{
    if(!e.target.value.match(/\S+@\S+\.\S+/) && e.target.value.length > 0){
      setValidateEmail('Incorrect Email');
    }else{
      setValidateEmail('');
    }
  }
  // validating date
  const validateBirthday = (e) => {
    if(!e.target.value.match(/^\d{4}-\d{2}-\d{2}$/) && e.target.value.length >0){
      setValidateDate('Please use format (yyyy-mm-dd)');
    }
      else{
        setValidateDate('');
      } 
    }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // vslidating empty inputs
    if(username.length === 0 || password.length === 0 || email.length === 0 || birthday.length === 0){
      setWarning('Please fill in all the fields');
      return false
    }

    // prevent incorrect  credentials
    if(validateUser || validatePassword || validateEmail || validateDate){
      alert('Entered incorrect values');
      return false
    }
    axios.post('https://myflix-movies-api.herokuapp.com/users',{
      Username:username,
      Password:password,
      Email:email,
      Birthday:birthday
    })
    .then (response =>{
      const data =response.data;
      console.log(data);
      // // the second argument '_self' is necessary so that the page will open in the current tab
      window.open('/','_self');
    })
    .catch(e =>{
      console.log('error registering the user');
      if(e.response.data == `${username} or ${email} already exist`){
        setWarning('Username or Email already exists');
      }
    })

  };

  return (
    <>
     <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">My Flix</Navbar.Brand>
        </Navbar>
    <Form>
      <Form.Group controlId="formUsername">
     <Form.Label>Username:</Form.Label>
       <Form.Control type="text" placeholder ='enter Username' value={username}
          onChange={(e) => setUsername(e.target.value),validateUsername(e)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
      <Form.Label>Create Password:</Form.Label>
       <Form.Control  type="password" placeholder ='enter password' value={password}
          onChange={(e) => setPassword(e.target.value),validatePassword(e)}
        />
        </Form.Group>
       <Form.Group controlId="formGroupEmail">
        <Form.Label> Email:</Form.Label>
         
          <Form.Control 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value),validateEmail(e)}
          />
          </Form.Group>
      
        <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
         <Form.Control 
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value),validateBirthday(e)}
          />
          </Form.Group>
      
      <Button variant='primary' type="submit" onClick={handleSubmit}>Submit</Button>
{/*      
      <button type='button' onClick={props.toggleForms}>If you have an Account login</button> */}
      <Form.Text classname='text-muted'>
        Already have an account?Register <Link to={`/`}>here</Link>
      </Form.Text>
      <div className ='warning'>{warning}</div>
    </Form>
    </>
  );
}