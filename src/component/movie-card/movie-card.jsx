import React from 'react';
// propTypes avoid bugs and validates datatypes
import PropTypes from 'prop-types';
// create Moviecard component
export class MovieCard extends React.Component{
  render(){
    // 2 props-one function(onMovieclick) and object (movieData)
    const {movieData,onMovieClick} = this.props;
   return <div className='movie-card' onClick={()=>{onMovieClick(movieData);}}>{movieData.Title}</div>
  }
}
// set static propTypes property on MovieCard to an object that contains special values
// the props object must contain onMovieClick and it must be a function.
// onMovieClick function is passed as a prop to the MovieCard component, it will avoid warning in the console upon running the application 
MovieCard.propTypes={
movieData:PropTypes.shape({
  Title:PropTypes.string.isRequired,
  Description:PropTypes.string.isRequired,
  ImagePath:PropTypes.string.isRequired,
  Genre:PropTypes.string.isRequired,
  Director:PropTypes.string.isRequired
}).isRequired,
onMovieClick:PropTypes.func.isRequired
};

