import React from 'react';
import PropTypes from 'prop-types';
import  Jumbotron  from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import './genre-view.scss';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick} = this.props;
    const genreMovies = movies.filter(m => m.genre.name === genre.name)

    return (
      <Jumbotron fluid className="GenreView">
        <div className="genre-view">
          <div className="genre-name">
            <span className="label">Genre: </span>
            <span className="value">{genre.Name}</span>
          </div>
          <div className="genre-description">
            <span className="label">Description: </span>
            <span className="value">{genre.Description}</span>
          </div>
          <div className="genre-movies">
        
            <Link to={`/movies/${m._id}`}>{m.title}</Link>
            </div>
          <Button variant="link" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
      </Jumbotron>
    );
  }
}
GenreView.propTypes = {
  genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
  }),
   onBackClick: PropTypes.func.isRequired
};