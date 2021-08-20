import {combineReducers} from 'redux';
import { SET_MOVIES, SET_FILTER, SET_USER } from '../actions/actions';

const visibilityFilter = (state='', action) => {
    switch(action.type){
        case SET_FILTER:
            return action.value;
        
        default:
            return state;
    }
}

const movies = (state= [], action) => {
    switch(action.type) {
        case SET_MOVIES:
            return action.value;
        
        default:
            return state;
    }
}


const user = (state='', action) => {
    switch(action.type) {
        case SET_USER:
            return action.value;
        
        default:
            return state;
    }
}

// Alternative to {combineReducers}
// const moviesApp = (state={}, action) => ({
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     movies: movies(state.movies, action)
// })

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user
})

export default moviesApp;