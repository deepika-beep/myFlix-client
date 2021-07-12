import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import axios from 'axios';
export class MovieView extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      
    };
  }

  addFavorite(movie){
    const token = localStorage.getItem('token');
    const url ='https://myflix-movies-api.herokuapp.com/users/' + localStorage.getItem('user') + '/movies/' + movie._id;
    axios.post(url,'',{
      headers:{Authorization:`Bearer ${token}`},

    })
    .then((response )=>{
      console.log(response);
      alert(movie.Title + 'has added to favorites');
    })
  }

  
  render(){
    const {movieData,onBackClick} = this.props;
    return (
       <Jumbotron fluid className="MovieView">
    <div className = 'movie-view'>
    <div className='movie-poster'>
      <img src={movieData.ImagePath} />
      </div>
      <div className = 'movie-title'>
        <span className = 'label'>Title:</span>
        <span className = 'value'>{movieData.Title}</span>
      </div>
      <div className = 'movie-description'>
      <span className = 'label'>Description:</span>
      <span className = 'value'>{movieData.Description}</span>
      </div>
       {/* add “Director” and “Genre” buttons in the movie view and route to the director and genre views   */}
       <div className="movie-director">
         <span className='label'>Direction:</span>
         <span className='link'>
     <Link to ={`/director/${movieData.Director.Name}`}>
     <Button variant='link'>Director</Button>
     </Link>
     </span>
     </div>
     <div className="movie-genre">
       <span className='label'>Genre:</span>
       <span className='link'>
    <Link to ={`/genre/${movieData.Genre.Name}`}>
      <Button variant='link'>Genre</Button>
    </Link>
    </span>
    </div>
    {/* history.goBack() has been called, which means whenever you click on the back button  in “movie-view.jsx,” it will eventually call goBack() function in main-view */}
      <button variant ='link' onClick = {() => {onBackClick(null);}}>Back</button>
      </div>
      </Jumbotron>
  );
}
}
MovieView.propTypes = {
  movieData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string
    }),
  }),
  onBackClick: PropTypes.func.isRequired
};
