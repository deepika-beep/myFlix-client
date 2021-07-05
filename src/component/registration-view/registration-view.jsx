import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import axios from "axios";
export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
    })

  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
     <Form.Label>Username:</Form.Label>
       <Form.Control type="text" placeholder ='enter Username' value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
      <Form.Label>Create Password:</Form.Label>
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