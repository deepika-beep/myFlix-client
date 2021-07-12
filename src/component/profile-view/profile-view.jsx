import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import{Button} from 'react-bootstrap/Button';
import{Form} from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import {FormControl} from 'react-bootstrap';
import {connect} from 'react-redux';


// Get the movie array and the user from store
const mapStateToProps = state => {
    const {movies, user} = state;
    return {movies, user}
}
 function ProfileView({user,userProfile,userToken,onDelete,onUpdate,movies,onMovieDelete}){
  const[newUsername,updateUsername] = useState('');
  const[newPassword,updatePassword] = useState('');
  const[newEmail,updateEmail] = useState('');
  const[newBirth,updateBirth] = useState('');


// Validating States
const[validateUser,setValidateUser] = useState('');
const[validatePassword,setValidatePassword] = useState('');
const[validateEmail,setValidateEmail] = useState('');
const[validateDate,setValidateDate] = useState('');
const[feedback,setFeedback] = useState('');

const {username,email,birthday,favoritemovies} =userProfile;

  // Validating username
  const validateUsername =(e)=>{
    if(e.target.value.length > 0 && e.target.value.length < 5){
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
    if(e.target.value.length > 0 && e.target.value.length <8){
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

    // Clear inputs after submission
    const clearForm =()=>{
      updateUsername('');
      updateEmail('');
      updatePassword('');
      updateBirth('')
    }

    const updateUser =(e)=> {
      e.preventDefault();
    

    // validate empty inputs
    if(newUsername.length === 0 || newPassword.length === 0 || newEmail.length === 0 || newBirth.length === 0){
      alert('please fill in all the fields');
      return false
    }
    //  prevent submission of incorrect credentials
    if(validateUser || validateEmail || validatePassword || validateDate){
      alert('incorrect credentials');
      return false
    }
    axios.put(`https://myflix-movies-api.herokuapp.com/users/${username}`,
    {
      username:newUsername,
      pwd:newPassword,
      email:newEmail,
      birthday:newBirth
    },
    {
      headers: { Authorization:`Bearer ${userToken}`}
    }).then(response =>{
      const data =response.data;
      onUpdate(data)
      setFeedback('Form has been submitted')
      clearForm()
    }).catch(err=>{
      console.log(err + 'update failed');

    })
  }

    // delete account
    const deleteUser = () =>{
      axios.delete(`https://myflix-movies-api.herokuapp.com/users/${username}`,{
        headers:{Authorization:`Bearer ${userToken}`}
      }).then(response=>{
        console.log(response.data);
        onDelete();
            }).catch(err =>{
              console.log(err);
            })
    }

//  delete a film from fav
const deleteMovie =(movieID)=>{
axios.delete(`https://myflix-movies-api.herokuapp.com/users/${username}/Favorites/${movieID}`,
{
  headers:{Authorization:`Bearer ${userToken}`}
  }).then(response=>{
    const data = response.data;
    onMovieDelete(data)
  }).catch(err =>{
    console.log(err);
  })
}
// filter the movies based on fav movies(array of movie_id)
const filterMovies = movies.filter(m =>{
  return favoritemovies.indexof(m._id) >= 0;
})
return(
  <div className="profile-view">
     <div className="user-profile">
    <div className="user-info">
      <span className="label">Username:</span>
    <span className='value'>{username}</span>
    </div>
<div className="user-info">
  <span className='label'>Email:</span>
  <span className='value'>{email}</span>  
</div>
<div className="user-info">
  <span className='label'>Birthday:</span>
  <span className='value'>{birthday}</span>
</div>
<div className="user-info">
    <span className='label'>Favorite Movies:</span>
    <ul className='user'>
      {filteredMovies.map((m,index)=> <li className ='fav-list'> <Link to={
        `{/movies/${m._id}`}>{m.title}</Link> </li>)}
    </ul>
</div>
  </div>

<Form className= 'update-info'>
   <Form.Group controlId="formUsername">
        <Form.Label>New-username:</Form.Label>
        <FormControl type ='text' value={newUsername} onChange={(e) =>{updateUsername(e.target.value), validateUsername(e)}}/>
   </Form.Group>

   <Form.Group controlId="formPassword">
        <Form.Label>New-Password:</Form.Label>
        <FormControl type ='text' value={newUsername} onChange={(e) =>{updatePassword(e.target.value), validatePassword(e)}}/>
   </Form.Group>

   <Form.Group controlId="formEmail">
      <Form.Label>New-email:</Form.Label>
       <Form.Control type="email"  value={newEmail} onChange={(e) => {updateEmail(e.target.value),  validateMail(e)}} />
        </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
          <Form.Control type="email"  value={newBirthday} onChange={(e) => {updateBirthday(e.target.value),  validateBirthday(e)}} />
       </Form.Group>

       <div className="button-wrapper">
          <Button variant="primary"  type="submit" onClick={updateUser} >Update details</Button>
          <Button variant="danger"  type="button" onClick={deleteUser} >Delete account</Button>
      </div>
   </Form>
   </div>
 ) 
      }
      ProfileView.propTypes ={
        movies:PropTypes.array.isRequired,
        userProfile:PropTypes.shape({
          username:PropTypes.string.isRequired,
          email:PropTypes.string.isRequired,
          favoritemovies:PropTypes.array.isRequired,
          _id:PropTypes.string
        }).isRequired,
        userToken:PropTypes.string.isRequired,
        onDelete:PropTypes.func.isRequired,
        onUpdate:PropTypes.func.isRequired,
        onMovieDelete:PropTypes.func.isRequired
      }
      export default connect(mapStateToProps)(ProfileView)