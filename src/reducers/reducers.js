// logic for the reducers
import { combineReducers } from "redux";
import { SET_MOVIES, SET_FILTER } from "../action/action";

// reducer functions
function visibilityFilter(state='',action){
switch(action.type){
  case SET_FILTER:
    return action.value;
    default:
      return state;
    
}
}
function movies(state=[],action){
  switch(action.type){
    case SET_MOVIES:
      return action.value;
      default:
        return state;
  }
}
// function moviesApp(state={},action){
//   return{
//   visibilityFilter:visibilityFilter(state.visibilityFilter,action),
//   movies:movies(state.movies,action)
// }
// combined reducers
const moviesApp = combineReducers({
  visibilityFilter,
  movies
});
export default moviesApp;