import React from 'react';
import ReactDOM from 'react-dom';
// To import main-view into other index-jsx file
import MainView from './component/main-view/main-view';
// Import statement to indicate that you need to bundle `./index.scss
import './index.scss';
class MyFlixApplication extends React.Component{
  render(){
    return (
      <MainView/>
    );
  }
}
// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
