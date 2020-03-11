import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  useHistory
} from 'react-router-dom';

const DefaultRoute = ({ component: Component, ...rest }) => {
    const path = useHistory().location.pathname;
  return (

     <Route {...rest} render={(props) => (
         <Redirect to='/home' /> 
        //  <Component {...props} />
         
    )} />
  )};
  export default DefaultRoute;
 
  
