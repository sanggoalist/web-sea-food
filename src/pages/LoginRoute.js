import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

const LoginRoute = ({ component: Component, ...rest }) => {
  
  return (

     <Route {...rest} render={(props) => (
      localStorage.getItem("userItem")
        ? <Redirect to='/home' />
        : <Component {...props} />
    )} />
  )};
  export default LoginRoute;
  
