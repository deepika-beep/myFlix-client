import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import {createStore}from 'redux';
import {Provider} from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';
// To import main-view into other index-jsx file
import MainView from './component/main-view/main-view';
// react-bootstrap components

// Import statement to indicate that you need to bundle `./index.scss
import './index.scss';
const store = createStore(moviesApp);

class MyFlixApplication extends React.Component{
  render(){
    return (
      <Provider store={store}>
      <Container>
      <MainView/>
      </Container>
      </Provider>
    );
  }
}
// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

