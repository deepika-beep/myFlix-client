import React from 'react';
import Col from 'react-bootstrap/Col';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import {MovieCard} from '../movie-card/movie-card';

const mapStateToProps = state => {
    const {visibilityFilter} = state;
    return {visibilityFilter};
};

function MovieList(props) {

    const {movies, visibilityFilter} = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return <>
        <Col md={12} style={{margin: '1em'}}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>

        {filteredMovies.map(m => (
            <Col md={6} key={m._id}>
                <MovieCard movie={m} />
            </Col>  
        ))};
    </>
}

MovieList.propTypes = {
    movies: PropTypes.array.isRequired,
    visibilityFilter: PropTypes.string.isRequired
}

export default connect(mapStateToProps)(MovieList);