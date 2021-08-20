
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import './director-view.scss';
// Getting the movie list from store as prop
const mapStateToProps = state => {
    const {movies} = state;
    return {movies};
};
function DirectorView({ director, clickBack, movies }) {

    const directorsMovies = movies.filter(m => m.director.name === director.name)
    return (
        <div className="director-view">
            <h2> {director.Name} </h2>
            <p> {director.Bio} </p>

            <div>
                <small>Birth: </small>
                <p>{director.Birth.slice(0, 10)}</p>
            </div>

            <div className="director-movies">
                    <small>Movies belonging to this director:</small>
                    {directorsMovies.map((m, i) => <p key={m._id}> <Link to={`/movies/${m._id}`}>{m.title}</Link> </p> )}
            </div> <hr />
            <Button variant="link"  onClick={() => { clickBack(); }}>Back</Button>
        </div>
    )
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
  }).isRequired,
  clickBack: PropTypes.func.isRequired
};
export default connect(mapStateToProps)(DirectorView)