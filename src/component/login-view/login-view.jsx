import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from "react-router-dom";
import './login-view.scss';
import Navbar from 'react-bootstrap/Navbar';
export function LoginView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
     const [ validateUser, setValidateUser ] = useState('');
    const [ validatePassword, setValidatePassword ] = useState('');
    const [ warning, setWarning ] = useState('');

    

    // Username Validation
    const validateUsername = (e) => {
        if (e.target.value.length > 0 && e.target.value.length < 5) {
            setValidateUser('Username must be longer than 5 characters' );
        }else {
            setValidateUser('');
        }

        if (!e.currentTarget.value.match(/^[A-Za-z0-9]+$/) && e.target.value.length > 0) {
            setValidateUser('Only alphanumeric characters allowed')
        }
    }  
    
    // Password validation
    const validatePwd = (e) => {
        if (e.target.value.length > 0 && e.target.value.length < 8) {
            setValidatePassword('Password must be longer than 8 characters');
        }else {
            setValidatePassword('');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // prevent submission in case an input is empty is empty
        if(Username.length === 0) {
            setWarning('You must introduce a username')
            return false
        }
        if(Password.length === 0) {
            setWarning('You must introduce a password')
            return false
        }

        //prevent submission of incorrect credentials
        if( validatePassword || validateUser ) {
            if(validateUser) {
                setWarning('Incorrectly introduced username')
                return false
            }
            if(validatePassword) {
                setWarning('Incorrectly introduced password')
                return false
            }
            return false
        }

    axios.post('https://myflix-movies-api.herokuapp.com/login', {
      Username: Username,
      Password: Password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    }).catch(err => {
            console.log(err);
            const error = !err.response.data.user ? 'Incorrect username or password' : err.response.data ;
            setWarning(error);       
    });
  };

  return (
    <>
        <Navbar bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="#home">My Flix</Navbar.Brand>
        </Navbar>
        <Form>
            <h3>Login</h3> <hr />
            <Form.Group controlId="formUsername">
                <Form.Label>Username </Form.Label>
                <Form.Control type="text" value={Username} onChange={ (e) => {setUsername(e.target.value), validateUsername(e)}} />
                <span className="validation-feedback">{validateUser}</span>
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={Password} onChange={ (e) => {setPassword(e.target.value), validatePwd(e)}} />
                <span className="validation-feedback">{validatePassword}</span>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={ handleSubmit } >Submit</Button>

            <Form.Text className="text-muted">
                No account yet? Create one <Link to={`/register`}>here</Link>
            </Form.Text>
            <div className="warning">{warning}</div>
        </Form>
        </>
  );
}

LoginView.propTypes = {
 onLoggedIn:PropTypes.func.isRequired
};
