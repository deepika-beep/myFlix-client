import React from 'react';
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
    return (<div className = 'movie-view'>
    <div className='movie-poster'>
      <img src={movieData.ImagePath} />
      </div>
      <div className = 'movie-title'>
        <span className = 'label'>Title</span>
        <span className = 'value'>{movieData.Title}</span>
      </div>
      <div className = 'movie-description'>
      <span className = 'label'>Description:</span>
      <span className = 'value'>{movieData.Description}</span>
      </div>
      
      <button onClick = {() => {onBackClick(null);}}>Back</button>
      </div>
  );
}
}
