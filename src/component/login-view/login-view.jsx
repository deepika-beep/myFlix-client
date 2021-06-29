//  useState Hook provides a way to simplify and rewrite the class component as a more readable function component
import React,{useState} from 'react';
export function LoginView(props){
  // useState() method is initial value of login variable,returns an array assigning current value to username,setUsername  variable a method to  update username variable.
  const[username,setUsername] = useState('');
  const[password,setPassword] = useState('');

// handleSubmit will log username and password into console
const handleSubmit = (e) =>{
  e.preventDefault();
  console.log(username,password);
   // allow users to be automatically logged in
   props.onLoggedIn(username); 
 
}
 return(
   <form>
     <label>Username:
       <input type = 'text' value = {username} onChange = {e => setUsername(e.target.value)}/>
       </label>
       <label>Password:
       <input type = "text" value = {password} onChange = {e => setPassword(e.target.value)} />
       </label>
       <button type='submit' onClick={handleSubmit}>Submit</button>
       <button type='button' onClick={props.toggleForms}>if no account register</button>
       </form>
 )
}