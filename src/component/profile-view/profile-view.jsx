import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import  Button  from 'react-bootstrap/Button';
import  Form  from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { FormControl,FormGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import './profile-view.scss';
// Get the movie array and the user from store
const mapStateToProps = state => {
  const { movies, user } = state;
  return { movies, user }
}
function ProfileView({ user, userToken, onDelete, onUpdate, movies, onMovieDelete }) {
  const [ newUsername, updateUsername ] = useState('');
  const [ newPassword, updatePassword ] = useState('');
  const [ newEmail, updateEmail ] = useState('');
  const [ newBirth, updateBirth ] = useState('');


// Validating States
const [validateUser, setValidateUser] = useState('');
const [validatePassword, setValidatePassword] = useState('');
const [validateEmail, setValidateEmail] = useState('');
const [validateDate, setValidateDate] = useState('');
const [feedback, setFeedback] = useState('');

const { Username, Email, Birth_Date, FavoriteMovies } = user;

// Validating username
const validateUsername = (e) => {
  if (e.target.value.length > 0 && e.target.value.length < 5) {
    setValidateUser('Username must be longer than 5 characters');
  }
  else {
    setValidateUser('');
  }
  if (!e.currentTarget.value.match(/^[0-9a-zA-Z]+$/) && e.target.value.length > 0) {
    setValidateUser('only alphanumeric charecters allowed');
  }
}
// Validating pASSWORD
const validatePwd = (e) => {
  if (e.target.value.length > 0 && e.target.value.length < 8) {
    setValidatePassword('Password must be longer than 8 characters');
  } else {
    setValidatePassword('');
  }
}
// Validating email
const validateMail = (e) => {
  if (!e.target.value.match(/\S+@\S+\.\S+/) && e.target.value.length > 0) {
    setValidateEmail('Incorrect Email');
  } else {
    setValidateEmail('');
  }
}
// validating date
const validateBirthday = (e) => {
if (!e.target.value.match(/^\d{4}-\d{2}-\d{2}$/) && e.target.value.length > 0) {
    
    setValidateDate('Please use format (yyyy-mm-dd)');
  }
  else {
    setValidateDate('');
  }
} 

// Clear inputs after submission
const clearForm = () => {
  updateUsername('');
  updateEmail('');
  updatePassword('');
  updateBirth('')
}

const updateUser = (e) => {
  e.preventDefault();


// validate empty inputs
if (newUsername.length === 0 || newPassword.length === 0 || newEmail.length === 0 || newBirth.length === 0) {
  alert('please fill in all the fields')
  return false
}
//  prevent submission of incorrect credentials
if (validateUser || validateEmail || validatePassword || validateDate) {
  alert('incorrect credentials');
  return false;
}
axios.put(`https://myflix-movies-api.herokuapp.com/users/${Username}`,
  {
    Username: newUsername,
    Password: newPassword,
    Email: newEmail,
    Birth_Date: newBirth
  },
  {
    headers: { Authorization: `Bearer ${userToken}` }
  }).then(response => {
    const data = response.data;
    onUpdate(data)
    setFeedback('Form has been submitted')
    clearForm()
  }).catch(err => {
    console.log(err + 'update failed');
    setFeedback('Submission failed')
  })
}
// delete account
const deleteUser = () => {
  axios.delete(`https://myflix-movies-api.herokuapp.com/users/${Username}`, 
  {
    headers: { Authorization: `Bearer ${userToken}` }
  }).then(response => {
    console.log(response.data);
    onDelete();
  }).catch(err => {
    console.log(err);
  })
}

//  delete a film from fav
const deleteMovie = (movieID) => {
  axios.delete(`https://myflix-movies-api.herokuapp.com/users/${Username}/Favorites/${movieID}`,
    {
      headers: { Authorization: `Bearer ${userToken}` }
    }).then(response => {
      const data = response.data;
      onMovieDelete(data)
    }).catch(err => {
      console.log(err);
    })

  }
  // filter the movies based on fav movies(array of movie_id)
  // const filteredMovies = movies.filter(m => {
  //   return FavoriteMovies.indexof(m._id) >= 0;
  // });
  return (
    <div className="profile-view">
      <h4>{`Welcome ${Username}`}</h4> <hr />
      <div className="user-profile">
        <div className="user-info">
          <span className="user-label">Username:</span>
          <span className='value'>{Username}</span>
        </div>
        <div className="user-info">
          <span className='label'>Email:</span>
          <span className='value'>{Email}</span>
        </div>
        <div className="user-info">
          <span className='label'>Birthday:</span>
          <span className='value'>{Birth_Date.slice(0, 10)}</span>
        </div>
        <div className="user-info">
          <span className='label'>Favorite Movies:</span>
          <ul className='user'>
            {/* {filteredMovies.map((m, index) => <li key={index} className='fav-list'> <Link to={
              `{/movies/${m._id}`}>{m.Title}</Link> <button className="close" onClick={() => deleteMovie(m._id)} >&times;</button> </li>)} */}
          </ul>
        </div>
      </div>

      <Form className='update-info'>
        <h4>Manage account</h4> <hr />
        <Form.Group controlId="formBasicUsername">
          <Form.Label>New-username:</Form.Label>
          <FormControl type='text' value={newUsername} onChange={(e) => { updateUsername(e.target.value), validateUsername(e) }} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>New-Password:</Form.Label>
          <FormControl type='password' value={newPassword} onChange={(e) => { updatePassword(e.target.value), validatePwd(e) }} />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>New-email:</Form.Label>
          <Form.Control type="email" value={newEmail} onChange={(e) => { updateEmail(e.target.value), validateMail(e) }} />
          <span className="validation-feedback">{validateEmail}</span>
        </Form.Group>

        <Form.Group controlId="formBasicBirth">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control type="text" value={newBirth} onChange={(e) => { updateBirth(e.target.value), validateBirthday(e) }} />
          <span className="validation-feedback">{validateDate}</span>
        </Form.Group>

        <div className="feedback">{feedback}</div>
        <div className="button-wrapper">
          <Button variant="primary" type="submit" onClick={() =>updateUser} >Update details</Button>
          <Button variant="danger" type="button" onClick={() => {
            if (confirm("Are you sure?")) {
              deleteUser();
            }
          }}  >Delete account</Button>
        </div>
      </Form>
    </div>
  )
}
ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.array.isRequired,
    Password: PropTypes.string,
    _id: PropTypes.string
  }).isRequired,
  userToken: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onMovieDelete: PropTypes.func.isRequired
}
export default connect(mapStateToProps)(ProfileView)