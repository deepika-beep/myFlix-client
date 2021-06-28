import React from 'react';
import axios from 'axios';
// Loginview pass the user details from the Mainview
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import  {MovieView} from '../movie-view/movie-view';
export class MainView extends React.Component{
   constructor(){
    //  call the constructor of parent class
    super();
    // initial state set to null
     this.state={
       movies:[],
      
       selectedMovie:null,
      //  when user has not loggeg in or is logged out 
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
  //  when a movie is clicked ,this function is invoked and updates the state of 'selectedMovie' property to that movie
   setSelectedMovie(newSelectedMovie){
     this.setState({
       selectedMovie:newSelectedMovie
     });
   }
  //  when a user logs in ,this function updates the  'user' property to that particular user
  onLoggegIn(user){
    this.setState({
      user
    });
  }
  render(){
    const {movies,selectedMovie} = this.state;
    // If there is no user ,LoginView is rendered.If there is a user loggedin,the user derails are passed as a prop to the LoginView
    if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
    if (movies.length===0)
    return <div className ='main-view'></div>;
    // display list of movie cards
    { /* added custom attribute movieData to use movie data within MovieCard component */}
 {/* To refer to the setSelectedMovie method, use this.setSelectedMovie */}
    return(
    <div className ='main-view'>
      {selectedMovie ?
      <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie =>{this.setSelectedMovie(newSelectedMovie);}}/>
      
 
     : movies.map(movie =>(<MovieCard key={movie._id} movieData={movie} onMovieClick={(movie)=> {this.setSelectedMovie(movie)}}/>))
      }
    </div>
    );
  }}

// export keyword exposes the MainView component
export default MainView;