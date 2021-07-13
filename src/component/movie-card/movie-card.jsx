import React from 'react';
// propTypes avoid bugs and validates datatypes
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from 'react-router-dom';
// create Moviecard component
export class MovieCard extends React.Component{
  render(){
    // 2 props-one function(onMovieclick) and object (movieData)
    const {movieData} = this.props;
   console.log(movieData);
   return (
   <Card>
   <Card.Img variant="top" src={movieData.ImagePath} />

  <Card.Body>
    <Card.Title>{movieData.Title}</Card.Title>
    <Card.Text>{movieData.Description}</Card.Text>
    <Link to={`/movies/${movieData._id}`}>
    <Button variant="link">Open</Button>
    </Link>
  </Card.Body>
   </Card>
   );
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
  Genre:PropTypes.shape({
    Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
  }),
  Director:PropTypes.shape({
    Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      
  }),
}).isRequired,
// onMovieClick:PropTypes.func.isRequired
};

