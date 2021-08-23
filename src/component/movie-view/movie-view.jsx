import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './movie-view.scss';
const mapStateToProps = state => {
  const { user } = state;
  return { user }
}

class MovieView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // this state is the text of the button for adding or removing a movie
      buttonText: ''
    };
  }
  //Set the text of the button for add/remove a movie when the page loads or refreshes based on the content of the favorite_movies array.
  componentDidMount() {
    const favMovies = this.props.user.FavoriteMovies;
    const movieId = this.props.movie._id;
    if (favMovies.includes(movieId)) {
      this.setState({ buttonText: 'Remove from favorites' })
    }
    if (!favMovies.includes(movieId)) {
      this.setState({ buttonText: 'Add to favorites' })
    }
  }

  render() {
    const { movie, clickBack, token, user, onMovieAddorDelete } = this.props;
    const { buttonText } = this.state
    const { username } = user
    console.log(movie);
    // Add a movie to favorites
    const addMovie = () => {
      const userName = username;
      const accessToken = token;
      const movieId = movie._id;
      const url = `https://myflix-movies-api.herokuapp.com/users/${userName}/Favorites/${movieId}`;
      // axios.post(url , {
      //     headers: {Authorization: `Bearer ${token}`}
      // })
      fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + accessToken
        }
      }).then(response => {
        return response.json();
      }).then(data => {
        const userObj = data;
        // prop that updates the state of a users favorite_movies if a film is added to favorites
        onMovieAddorDelete(userObj);
      }).catch(err => {
        console.log(err);
      })
    }

    // Delete a film from favorites
    const deleteMovie = () => {
      axios.delete(`https://myflix-movies-api.herokuapp.com/users/${username}/Favorites/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` }

        }).then(response => {
          const data = response.data;
          // prop that updates the state of a users favorite_movies if a film is deleted from favorites
          onMovieAddorDelete(data)
        }).catch(err => {
          console.log(err)
        })
    }
    // Set the text of the button for add/remove a movie, when a user adds or removes a movie from favorites
    const addRemove = () => {
      if (user.favoritemovies.includes(movie._id)) {
        this.setState({ buttonText: 'Add to favorites' })
        deleteMovie();
      } else {
        this.setState({ buttonText: 'Remove from favorites' })
        addMovie();
      }
    }
    return (
     
        <div className='movie-view'>
           <div className="movie-image">
          <img src={movie.ImagePath} />
        </div>
        <div className='movie-title'>
          <span className='label'>Title:</span>
          <span className='value'>{movie.Title}</span>
        </div>
        <div className='movie-description'>
          <span className='label'>Description:</span>
          <span className='value'>{movie.Description}</span>
        </div>
        {/* add “Director” and “Genre” buttons in the movie view and route to the director and genre views   */}
        <div className="movie-director">
          <span className='label'>Director:</span>
          <span className="value">{movie.Director.Name}</span>
        </div>
        <div className="movie-genre">
          <span className='label'>Genre:</span>
          <span className="value">{movie.Genre.Name}</span>
        </div><hr />
        <Button variant="link" onClick={() => { clickBack(); }}>Back</Button>
        <Link to={`/Director/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
        <Link to={`/Genre/${movie.Genre.Name}`}>
          <Button variant='link'>Genre</Button>
        </Link>

        {<Button variant="link" onClick={addRemove}>{buttonText}</Button>}
    </div>
  
    )
  }
}
{/* history.goBack() has been called, which means whenever you click on the back button  in “movie-view.jsx,” it will eventually call goBack() function in main-view */ }

MovieView.propTypes = {
  movie: PropTypes.shape({
   
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string
    }),
  }),
  clickBack: PropTypes.func.isRequired,

    token: PropTypes.string.isRequired,
     user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        FavoriteMovies: PropTypes.array.isRequired,
        Birth_Date: PropTypes.string.isRequired,
        Password: PropTypes.string,
        _id: PropTypes.string
    }).isRequired,
        
    onMovieAddorDelete: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(MovieView)