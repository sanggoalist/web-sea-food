import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

const UnAuthRoute = ({ component: Component, ...rest }) => {
  
  return (

     <Route {...rest} render={(props) => (
      localStorage.getItem("userItem")
        ? <Redirect to='/login' />
        :  <Component {...props} />
    )} />
  )};
  export default UnAuthRoute;
 