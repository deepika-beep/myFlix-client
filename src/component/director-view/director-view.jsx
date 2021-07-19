import React from 'react';
import Jumbotron  from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import './director-view.scss';
// get movielist from  store as prop
const mapStateToProps = state =>{
  const{movies} = state;
  return{movies}
}
export class DirectorView extends React.Component{

 render() {
    const { director,movies,onBackClick } = this.props;
    // const directorsMovies = movies.filter(m => m.director.name === director.name)
   
    return (
      <Jumbotron fluid className='director'>
        <div className="director-view">
          <div className="director-name">
            <span className="label">Director: </span>
            <span className="value">{director.Name}</span>
          </div>
          <div className="director-bio">
            <span className="label">Bio: </span>
            <span className="value">{director.Bio}</span>
          </div>
          <div className="director-birth">
            <span className="label">DOB: </span>
            <span className="value">{director.Birth}</span>
          </div>
          <div className="director-movies">
               <Link to={`/movies/${m._id}`}>{m.title}</Link>
            </div> 
          <Button variant="link" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
      </Jumbotron>
    );
  }
}
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired
   
  }),
  onBackClick: PropTypes.func.isRequired,
 
};
export default connect(mapStateToProps)(DirectorView)