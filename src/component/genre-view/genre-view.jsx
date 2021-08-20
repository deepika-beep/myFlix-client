
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import "./genre-view.scss"
// Getting the movie list from store as prop
const mapStateToProps = state => {
  const { movies } = state;
  return { movies };
};
function GenreView(props) {

  const { genre, clickBack, movies } = props;

  const genresMovies = movies.filter(m => m.genre.name === genre.name)


  return (
    <div className="director-view">
      <h2> {genre.Name} </h2>
      <p> {genre.Description} </p>


      <div className="genre-movies">
        <small>Movies belonging to this genre:</small>
        {genresMovies.map((m, i) => <p key={m._id}> <Link to={`/movies/${m._id}`}>{m.title}</Link> </p>)}
      </div> <hr />
      <Button variant="link" onClick={() => { clickBack(); }}>Back</Button>
    </div>
  )
}

GenreView.propTypes = {
  genre: PropTypes.shape({
  Name: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired
  }).isRequired,
  clickBack: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired
}

export default connect(mapStateToProps)(GenreView)