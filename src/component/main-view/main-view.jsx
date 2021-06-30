import React from 'react';
import axios from 'axios';
// Loginview pass the user details from the Mainview
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import  {MovieView} from '../movie-view/movie-view';
import {RegistrationView} from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import  Button  from 'react-bootstrap/Button';
import Card  from 'react-bootstrap/Card';
import  Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

export class MainView extends React.Component{
   constructor(){
    //  call the constructor of parent class
    super();
    // initial state set to null
     this.state={
       movies:[],
      showLoginForm:true,
       selectedMovie:null,
      //  when user has not logged in or is logged out 
        user:null
     }
    }
   componentDidMount(){
     axios.get('https://myflix-movies-api.herokuapp.com/movies')
     .then(response=>{
       this.setState({
         movies:response.data
       });
     }).catch (error=>{
       console.log(error);
     });
   }
   toggleForms=()=>{
     console.log('test');
     this.setState({
       showLoginForm:!this.state.showLoginForm
      // user:null
     })
   }
  //  when a movie is clicked ,this function is invoked and updates the state of 'selectedMovie' property to that movie
   setSelectedMovie(newSelectedMovie){
     this.setState({
       selectedMovie:newSelectedMovie
     });
   }
  //  when a user logs in ,this function updates the  'user' property to that particular user
  onLoggedIn(user){
    this.setState({
      user
    });
  }
  render(){
    const {movies,selectedMovie,user,showLoginForm} = this.state;
    // If there is no user ,LoginView is rendered.If there is a user loggedin,the user derails are passed as a prop to the LoginView
    if(!user && showLoginForm) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} toggleForms={()=>this.toggleForms()}/>
    if(!user && showLoginForm === false) return <RegistrationView toggleForms={()=>this.toggleForms()}/>
    if (movies.length===0)
    return <div className ='main-view'></div>;
  
    // display list of movie cards
    //  added custom attribute movieData to use movie data within MovieCard component 
//  To refer to the setSelectedMovie method, use this.setSelectedMovie 
// wrap each MovieCard within a Col Bootstrap component
    return(
       <Row className='justify-content-md-center'>
      {selectedMovie ?
      (
      <Col md={8}>
      <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie =>{this.setSelectedMovie(newSelectedMovie);}}/>
      </Col>
      )
      
     : 
       movies.map(movie =>(
        <Col md={3}>
          <MovieCard key={movie._id} movieData={movie} onMovieClick={newSelectedmovie => {this.setSelectedMovie(newSelectedMovie);}}/>
         </Col>
        ))}
     </Row>
    );
  }}
// export keyword exposes the MainView component
 export default MainView;
       