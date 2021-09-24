import React, { useState } from "react";

import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Navbar from "react-bootstrap/Navbar";
import Form from 'react-bootstrap/Form';
import axios from "axios";
import './registration-view.scss';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export function RegistrationView(props) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birth_Date, setBirthday] = useState("");
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
      setValidateUser('');
    }
    if(!e.currentTarget.value.match(/^[0-9a-zA-Z]+$/) && e.target.value.length >0){
      setValidateUser('only alphanumeric charecters allowed');
    }
  }
  // Validating pASSWORD
  const validatePwd = (e) => {
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
    if(Username.length === 0 || Password.length === 0 || Email.length === 0 || Birth_Date.length === 0){
      setWarning('Please fill in all the fields');
      return false
    }

    // prevent incorrect  credentials
    if(validateUser || validatePassword || validateEmail || validateDate){
      alert('Entered incorrect values');
      return false;
    }
    axios.post('https://myflix-movies-api.herokuapp.com/users',{
      Username:Username,
      Password:Password,
      Email:Email,
      Birth_Date:Birth_Date
    })  
    .then(response =>{
      const data =response.data;
      console.log(data);
      // // the second argument '_self' is necessary so that the page will open in the current tab
      window.open('/','_self');
    })
    .catch(e =>{
      console.log('error registering the user');
      if(e.response.data == `${Username} or ${Email} already exist.`&& e.response.status == 400 ) {
               setWarning('Username or Email already existent');
      }
      else{
        setWarning(e.response.data);
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
       <Form.Control type="text" placeholder ='enter Username' value={Username}
          onChange={(e) =>{ setUsername(e.target.value),validateUsername(e)}}
        />
          <span className="validation-feedback">{validateUser}</span> 

    <Form className='Register-Form'>
      <Form.Group controlId="formUsername">
     <Form.Label>Username:</Form.Label>
       <Form.Control type="text" placeholder ='enter Username' value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

      </Form.Group>

      <Form.Group controlId="formPassword">
      <Form.Label>Create Password:</Form.Label>

       <Form.Control  type="password" placeholder ='enter password' value={Password}
          onChange={(e) => setPassword(e.target.value)}   
        />
         <span className="validation-feedback">{validatePassword}</span> 
        </Form.Group>
       <Form.Group controlId="formEmail">
        <Form.Label> Email:</Form.Label>
             <Form.Control type="email" value={Email} onChange={ (e) => { setEmail(e.target.value), validateMail(e) }} />
              <span className="validation-feedback">{validateEmail}</span>
                </Form.Group> 
      
        <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
         <Form.Control 
            type="text"
            onChange={(e) => {setBirthday(e.target.value),validateBirthday(e)}}
          />
          <span className="validation-feedback">{validateDate}</span>
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

       <Form.Control  type="password" placeholder ='enter password' value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        </Form.Group>
       <Form.Group controlId="formGroupEmail">
        <Form.Label> Email:</Form.Label>
         
          <Form.Control 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </Form.Group>
      
        <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
         <Form.Control 
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          </Form.Group>
      
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      {/* <button onClick={() => { onBackClick(null); }}>Back</button> */}
      <button type='button' onClick={props.toggleForms}>If you have an Account login</button>
    </Form>

  );
}



RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
     Email:PropTypes.string.isRequired,
  Birth_Date:PropTypes.string.isRequired
  })};