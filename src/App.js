import React from 'react';
import logo from './logo.svg';
import './App.scss';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route } from "react-router-dom";
import ItemPage from './pages/ItemPage';
import Bar from './components/Bar';
import Drawser from './components/Drawser';
import SellPage from './pages/SellPage';
import ItemDetail from './components/ItemDetail';
import TopBar from './components/TopBar';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './pages/PrivateRoute';
function App() {

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
          <Route exact path="/" component={HomePage}/>
          <Route path="/home" component={HomePage}/>
          <Route  exact path="/items/:id" component={ItemPage}/>
          <Route exact path="/items/:id/sell" component={SellPage}/>
          <Route exact path="/items/:id/sell/:idd" component={ItemDetail}/>
          <PrivateRoute exact path="/user/profile" component={ProfilePage}/>    
    </div>

  </BrowserRouter>
  );
}

export default App;
