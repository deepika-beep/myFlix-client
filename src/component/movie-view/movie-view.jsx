import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

import Button from 'react-bootstrap/Button';
export class MovieView extends React.Component{

  // To be able to refer to the callback function, create a new keypressCallback() component method. 
  keypressCallback(event){
    console.log(event.key);
  }
  componentDidMount(){
    document.addEventListener('keypress',this.keypressCallback );
    }
    componentWillUnmount(){
      document.removeEventListener('keypress',this.keypressCallback);
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
     <Link to ={`/director/${movie.Director.Name}`}>
     <button variant='link'>Director</button>
     </Link>
    <Link to ={`/genre/${movie.Genre.Name}`}>
      <button variant='link'>Genre</button>

    </Link>
    {/* history.goBack() has been called, which means whenever you click on the back button  in “movie-view.jsx,” it will eventually call goBack() function in main-view */}
      <button variant ='link' onClick = {() => {onBackClick(null);}}>Back</button>
      </div>
      </Jumbotron>
  );
}
}
