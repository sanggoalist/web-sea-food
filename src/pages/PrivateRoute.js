import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  
  return (

     <Route {...rest} render={(props) => (
      localStorage.getItem("userItem")
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  )};
  export default PrivateRoute;