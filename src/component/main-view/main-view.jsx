import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
// BrowserRouter component is used to implement state-based routing
import {BrowserRouter as Router,Route}from 'react-router-dom';
// Loginview pass the user details from the Mainview
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import  {MovieView} from '../movie-view/movie-view';
import {RegistrationView} from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { BrowserRouter as Router,Route,Redirect} from 'react-router-dom';
import {ProfileView} from '../profile-view/profile-view';
import { setMovies } from '../../action/action';
import MoviesList from '../movie-list/movie-list';
import  Button  from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

 class MainView extends React.Component{
   constructor(){
    //  call the constructor of parent class
    super();
    // initial state set to null
     this.state={
      //  when user has not logged in or is logged out 
        user:null,
        token:null,
       
     }
    }
    //  get the value of the token from localStorage
   componentDidMount(){
    let accessToken =localStorage.getItem('token');
    if(accessToken!==null){
this.setState({
  user:localStorage.getItem('user'),
  user_profile:JSON.parse(localStorage.getItem('profile')),
  token:localStorage.getItem('token')
});
this.getMovies(accessToken);
 this.props.setUser(JSON.parse(localStorage.getItem('user')))
    }
    }
  //  toggleForms=()=>{
  //    console.log('test');
  //    this.setState({
  //      showLoginForm:!this.state.showLoginForm
  //     // user:null
  //    })
  //  }
  
  // The parameter has been renamed from user to authData,to use both the user and the token.
  // When a user enters the correct credentials, the backend sends back the token and username, which are used for two purposes. First, to update the user state so that the main view is rendered again and, secondly, to save authentication data in localStorage so that the next time you open your app, the browser remembers you’re already logged in.
  onLoggedIn(authData){
   console.log(authData);
   this.setState({
    user:authData.user.Username,
    token:authData.token,
    user_profile:authData.user
   });
    localStorage.setItem('token',authData.token);
   localStorage.setItem('user',authData.user.Username);
   localStorage.setItem('profile',JSON.stringify(authData.user));
   this.getMovies(authData.token);
  }
  // log out function-which deletes the token and the user from localStorage and clears the user state to null
  onLoggedOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user:null
    });
  }
  // update user's info
  updateUser(data){
    this.setState({
      user:data.username,
     
    })
    localStorage.setItem('username', data.username);
        localStorage.setItem('user', JSON.stringify(data));
        // update the state of user in the store after updating details
        this.props.setUser(data)
  }
  // delete account
  deleteUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
    this.setState({
      user:null,
      token:null
    })
  }
// The moment a user logs in, a GET request is made to the “movies” endpoint by passing the bearer authorization in the header of the HTTP request
  getMovies(token){
    axios.get('https://myflix-movies-api.herokuapp.com/movies',{
      headers:{Authorization:`Bearer ${token}`}
    })
    .then(response =>{
      // assign result to state
      this.props.setMovies(response.data);
    })
    .catch(function (error){
      console.log(error);
    })
  }
  render(){
    // movies is extracted from this.props rather than from the this.state
  const{movies}=this.props;
  const{user}=this.state;

    // calls the method when the button is clicked
    // display list of movie cards
// wrap each MovieCard within a Col Bootstrap component
// If there is no user ,LoginView is rendered.If there is a user loggedin,the user derails are passed as a prop to the LoginView 
    return(
      <Router>
       <Row className='main-view justify-content-md-center'>
         {/* homepage */}
      <Route exact path='/' render={()=>{
        if(!user) return 
      <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
      </Col>
       if (movies.length===0) return <div className ='main-view'/>;
         return <MoviesList movies={movies}/>;
        
      }}/>
      {/* RegistrationView */}
      <Route path ='/register' render={()=>{
        if(user)return<Redirect to='/'/>
        return<Col>
        <RegistrationView/>
        </Col>
      }}/>
     {/* MovieView */}
       <Route path='/movies/:movieId' render={({match,history})=>{
         if(!user) return 
      <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
      </Col>
      if (movies.length===0) return <div className ='main-view'/>;
         return <Col md={8}>
           <MovieView movie={movies.find(m=>m._id === match.params.movieId)}onBackClick ={() =>history.goBack()} token={token} user={user_profile} />
           </Col>
       }}/>
{/* GenreView */}
       <Route exact path='/genre/:name' render ={({match,history})=>{
         if(!user) return 
      <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
      </Col>
      if (movies.length===0) return <div className ='main-view'/>;
         return <Col md={8}>
           <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() =>history.goBack()} movies={movies}/>
         </Col>
       }}/>
{/* DirectorView */}
       <Route exact path ='/director/:name' render ={({match,history})=>{
         if(!user) return 
      <Col>
      <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
      </Col>
      if (movies.length===0) return <div className ='main-view'/>;
         return <Col md={8}>
           <DirectorView director={movies.find(m => m.director.Name === match.params.name).Director} onBackClick={() =>history.goBack()} movies={movies}/>
         </Col>
       }}/>
       {/* ProfileView */}
       <Route path='/users/:username' render={({match,history}) =>{
         if(!user){
           return <Col>
           <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
           </Col>
         }
          if (movies.length===0) return <div className ='main-view'/>;
          return <Col>
          <ProfileView onBackClick={() =>history.goBack()}  userProfile={user_profile} userToken={token} onDelete={this.deleteUser()} onUpdate={(data)=>this.updateUser(data)} movies={movies}/>
          </Col>
       }}/>
     </Row>
     </Router>
    );
  }}

  let mapStateToProps = state => {
    return{movies:state.movies}
  }
// export keyword exposes the MainView component
 export default connect(mapStateToProps,{setMovies}) (MainView);
       