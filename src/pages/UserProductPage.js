import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './UserProductPage.scss';
import SellPage from './SellPage';
import UserSell from '../components/user/UserSell';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Draggable from 'react-draggable';
import ProductModal from '../components/product/ProductModal';
import SpringModal from '../components/SpringModal';
import firebase from '../Firebase';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';



class UserProductPage extends React.Component {
    
  constructor(props){
    super(props);
    this.state = {
        value: 0,
        open: false
    }
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }
a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };
  closeModal(event) {
    this.setState({ open: false });
  }

handleChangeIndex = index => {
    this.setState({value: index});
  };
  addProduct(event){
    this.setState({open: true});
  }
    render() {
        TabPanel.propTypes = {
            children: PropTypes.node,
            index: PropTypes.any.isRequired,
            value: PropTypes.any.isRequired,
          };
          const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
      return (
        <div className="UserProductPage">
        <div className = "titleGroup">
        <Typography variant="h4" gutterBottom>
                               Your Products
        </Typography>  
        <Button
          variant="contained"
          color="primary"
          onClick = {event => {this.addProduct(event)}}
          startIcon={<AddShoppingCartIcon></AddShoppingCartIcon>}
        >
          Add product
        </Button>
        </div>
        <AppBar position="static" color="default">
            <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
            >
            <Tab label="Sell" {...this.a11yProps(0)} />
            <Tab label="Buy" {...this.a11yProps(1)} />
            </Tabs>
        </AppBar>
        <SwipeableViews
            index={this.state.value}
            onChangeIndex={event => {this.handleChangeIndex()}}
        >
            <TabPanel value={this.state.value} index={0}>
            <UserSell/>
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
            This function isn't implemented yet.
            </TabPanel>
        </SwipeableViews>
        {/* <Draggable>
          <Fab color="primary" aria-label="add" id = "btn-i" className = "add-btn" 
          onClick = {event => {this.addProduct(event)}}
          >
            <AddIcon />
          </Fab>
        </Draggable> */}
        <ProductModal openIt = {this.state.open} type = "sell" userId = {userId} closeFunc ={event => {this.closeModal()}}></ProductModal>
        </div>
      );
    }
}
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

export default withRouter(UserProductPage);