import React from 'react';
import axios from 'axios';
// BrowserRouter component is used to implement state-based routing
import PropTypes from 'prop-types';
// Loginview pass the user details from the Mainview
import { LoginView } from '../login-view/login-view';
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import MovieList from '../movie-list/movie-list';
import { MovieCard } from '../movie-card/movie-card';
import  MovieView  from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import  { DirectorView }  from '../director-view/director-view';
import  GenreView  from '../genre-view/genre-view';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import  ProfileView  from '../profile-view/profile-view';
import {NavigationBar} from '../navigation-bar/navigation-bar';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

 class MainView extends React.Component {
  constructor() {
    //  call the constructor of parent class
    super();
    // initial state set to null
    this.state = {
      username: null,
      token: null,
    }
    console.log('main-view loaded successfully')
  }
  //  get the value of the token from localStorage
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        username: localStorage.getItem('user'),
        user: JSON.parse(localStorage.getItem('profile')),
        token: localStorage.getItem('token')
      });
      console.log('compnentdid mount');
      this.getMovies(accessToken);
      this.props.setUser(JSON.parse(localStorage.getItem('user')))
    }
  }
  // The moment a user logs in, a GET request is made to the “movies” endpoint by passing the bearer authorization in the header of the HTTP request
  getMovies(token) {
    axios.get('https://myflix-movies-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // assign result to state
        this.props.setMovies(response.data)
      })
      .catch(error=> {
        console.log(error);
      })
  }
  // The parameter has been renamed from user to authData,to use both the user and the token.
  // When a user enters the correct credentials, the backend sends back the token and username, which are used for two purposes. First, to update the user state so that the main view is rendered again and, secondly, to save authentication data in localStorage so that the next time you open your app, the browser remembers you’re already logged in.
  loginUser(authData) {
    this.props.setUser(authData.user)
    // console.log(authData);
    this.setState({
      username: authData.user.username,
      token: authData.token,
    });

    localStorage.setItem('user', JSON.stringify(authData.user));
    localStorage.setItem('token', authData.token);
    localStorage.setItem('username', authData.user.username);
    this.getMovies(authData.token);
  }
  // log out function-which deletes the token and the user from localStorage and clears the user state to null
  onLoggedOut() {
    // localStorage.removeItem('token');
    // localStorage.removeItem('user');
    localStorage.clear();
    this.setState({
      username: null
    });
  }
  // update user's info
  updateUser(data) {
    this.setState({
      username: data.username,
    })
    localStorage.setItem('username', data.username);
    localStorage.setItem('user', JSON.stringify(data));
    // update the state of user in the store after updating details
    this.props.setUser(data)
  }

  // Set the state of user, which represents an object with data about a user, after adding or deleting a movie.
  onMovieAddOrDelete(data) {
    localStorage.setItem('user', JSON.stringify(data))
    this.props.setUser(data)
  }
  // delete account


  render() {
    const { username, token } = this.state;
    const { movies } = this.props;


    // calls the method when the button is clicked

    // display list of movie cards
    // wrap each MovieCard within a Col Bootstrap component
    // If there is no user ,LoginView is rendered.If there is a user loggedin,the user derails are passed as a prop to the LoginView 
    return (
      <Router>
        <Row className='main-view justify-content-md-center'>
          {/* homepage */}
          <Route exact path='/' render={() => {
            if (!username) {
              return <Col>
              <LoginView onLoggedIn={(user) => this.loginUser(user)} />
            </Col>
            }
            if (movies.length === 0) return <div className='main-view' />;
            return <>
              <NavigationBar logOut={() => this.onLoggedOut()} username={username} />
              <MovieList movies={movies} />;
            </>
          }} />
          {/* RegistrationView */}
          <Route path='/register' render={() => {
            if (username) return <Redirect to='/' />
            return <Col>
              <RegistrationView />
            </Col>
          }} />
          {/* MovieView */}
          <Route path='/movies/:movieId' render={({ match, history }) => {
            if (!username) {
              return <Col>
              <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
            </Col>
            }
            if (movies.length === 0) return <div className='main-view' />;
            return <Col md={12}>
              <NavigationBar logOut={() => this.onLoggedOut()} username={username} />
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} clickBack={() => history.goBack()} token={token} onMovieAddorDelete={(data) => this.onMovieAddOrDelete(data)} />
            </Col>
          }} />
          {/* GenreView */}
          <Route exact path='/Genre/:Name' render={({ match, history }) => {
            if (!username) {
              return <Col>
              <LoginView onLoggedIn={(user) => this.loginUser(user)} />
            </Col>
            }
            if (movies.length === 0) return <div className='main-view' />;
            return <Col md={12}>
              <NavigationBar logOut={() => this.onLoggedOut()} username={username} />
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.Name).genre} clickBack={() => {history.goBack()}} />
            </Col>
          }} />
          {/* DirectorView */}
          <Route path='/Director/:Name' render={({ match, history }) => {
            if (!username) {
              return <Col>
              <LoginView onLoggedIn={(user) => this.loginUser(user)} />
            </Col>
            }
            if (movies.length === 0) return <div className='main-view' />;
            return <Col md={12}>
              <NavigationBar logOut={() => this.onLoggedOut()} username={username} />
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} clickBack={() => {history.goBack()}} />
            </Col>
          }} />
          {/* ProfileView */}
          <Route path='/users/:username' render={({ match, history }) => {
            if (!username) {
              return <Col>
                <LoginView onLoggedIn={(user) => this.loginUser(user)} />
              </Col>
            }
            if (movies.length === 0) return <div className='main-view' />;
            return <Col>

              <NavigationBar logOut={() => this.onLoggedOut()} username={username} />
              <ProfileView clickBack={() => {history.goBack()}} userToken={token} onDelete={this.onLoggedOut()} onUpdate={(data) => this.updateUser(data)} onMovieDelete={(data) => this.onMovieAddOrDelete(data)} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }
}
MainView.propTypes = {
    movies: PropTypes.array.isRequired
}

let mapStateToProps = state => {
    return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
// export keyword exposes the MainView component



