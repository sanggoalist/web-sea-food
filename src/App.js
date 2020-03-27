import React from 'react';
import logo from './logo.svg';
import './App.scss';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, withRouter, Switch } from "react-router-dom";
import ItemPage from './pages/ItemPage';
import Bar from './components/Bar';
import Drawser from './components/Drawser';
import SellPage from './pages/SellPage';
import ItemDetail from './components/ItemDetail';
import TopBar from './components/TopBar';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './pages/PrivateRoute';
import LoginPage from './pages/LoginPage';
import LoginRoute from './pages/LoginRoute';
import DefaultRoute from './pages/DefaultRoute';
import RegisterPage from './pages/RegisterPage';
import UnAuthRoute from './pages/UnAuthRoute';
import UserInfoPage from './pages/UserInfoPage';
import UserProductPage from './pages/UserProductPage';
import EditText from './components/EditText';
function App(props) {

  const [state, setState] = React.useState({
    isOpen: false,
  });

  const handleOpen = event => {
    setState({isOpen: true});
  };
  const handleClose = event => {
    setState({isOpen: false});
  }

  
  return (
  <BrowserRouter>
    <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <Bar changeOpen = {handleOpen}/>
          <TopBar />
          <Drawser isOpen = {state.isOpen} changeOpen = {handleClose}/>
          {/* <DefaultRoute path="/" component={HomePage}/> */}
          <Route exact={true} path="/" component={HomePage}/>
          <Route exact path="/home" component={HomePage}/>
          <Route exact path="/edit" component={EditText}/>
          <Route  exact path="/items/:id" component={ItemPage}/>
          <Route exact path="/items/:id/sell" component={SellPage}/>
          <Route exact path="/items/:id/sell/:idd" component={ItemDetail}/>
          {/* <PrivateRoute exact path="/user/user-info" component={UserInfoPage}/> */}
          <PrivateRoute exact path="/user/products" component={UserProductPage}/>
          <LoginRoute exact path= "/login" component={LoginPage}/>
          <UnAuthRoute exact path= "/user/register" component = {RegisterPage}/>
          <PrivateRoute exact path="/user/profile" component={UserInfoPage}/>


    </div>

  </BrowserRouter>
  );
}

export default App;
