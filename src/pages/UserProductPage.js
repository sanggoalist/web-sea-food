import React from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import "./UserProductPage.scss";
import SellPage from "./SellPage";
import UserSell from "../components/user/UserSell";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Draggable from "react-draggable";
import ProductModal from "../components/product/ProductModal";
import SpringModal from "../components/SpringModal";
import firebase from "../Firebase";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import Button from "@material-ui/core/Button";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ProductForm from "../components/product/ProductForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import { Transition } from "../components/ItemDetail";
import { getCatgoryLinkName } from "../ultil/CatagoryUltil";

class UserProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.deleteItem = null;
    this.state = {
      value: 0,
      open: false,
      isLoad: false,
      openForm: false,
      countries: [],
      openMessage: "",
      message: "",
      item: null,
      isEdit: false,
      reload: false
    };
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  }
  handleClose(event) {
    if (!event) {
      this.setState({ reload: true });
    }
    this.setState({ openForm: false });
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  closeModal(event) {
    this.setState({ openForm: false });
  }

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  handleEdit(event) {
    this.setState({ isEdit: true, item: event, openForm: true });
  }
  addProduct(event) {
    this.setState({ isEdit: false, openForm: true });
  }
  componentDidMount() {
    const ref1 = firebase.database().ref(`countries`);
    ref1.on("value", res => {
      this.setState({ countries: res.val() });
    });
  }
  handleDelete(event) {
    this.setState({
      openMessage: event["openMessage"],
      message: event["message"]
    });
    this.deleteItem = event["item"];
  }
  deleteProduct(event) {
    console.log(this.deleteItem);
    // if (this.mounted) {
    this.setState({ openMessage: false, isLoad: true });
    const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
    const refImg = firebase
      .storage()
      .ref(`/images/${userId}/products/${this.deleteItem["id"]}`);
    refImg.list().then(res => {
      const ref = firebase
        .database()
        .ref(
          `products/${getCatgoryLinkName(
            +this.deleteItem["categoryId"]
          )}/sell/${this.deleteItem["id"]}`
        );
      var con = res.items.map(i => {
        const refi = firebase
          .storage()
          .ref(`/images/${userId}/products/${this.deleteItem["id"]}/${i.name}`);
        return refi.delete();
      });
      Promise.all([ref.set(null), con])
        .then(res => {
          this.setState({ isLoad: false });
        })
        .catch(err => {
          this.setState({ openMessage: true, message: "Error!" });
        });
    });
    // }
  }
  render() {
    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired
    };
    const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
    return (
      <div className="UserProductPage">
        <div className="titleGroup">
          <Typography variant="h4" gutterBottom>
            Your Products
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={event => {
              this.addProduct(event);
            }}
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
          onChangeIndex={event => {
            this.handleChangeIndex();
          }}
        >
          <TabPanel className="SellTab" value={this.state.value} index={0}>
            <UserSell
              type="sell"
              reload={this.state.reload}
              isUser={true}
              editing={event => {
                this.handleEdit(event);
              }}
              deleting={event => {
                this.handleDelete(event);
              }}
            />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <UserSell type="buy" />
          </TabPanel>
        </SwipeableViews>
        {/* <Draggable>
          <Fab color="primary" aria-label="add" id = "btn-i" className = "add-btn" 
          onClick = {event => {this.addProduct(event)}}
          >
            <AddIcon />
          </Fab>
        </Draggable> */}
        <Dialog
          fullScreen
          open={this.state.openForm}
          onClose={event => {
            this.handleClose(event);
          }}
          TransitionComponent={Transition}
        >
          <ProductForm
            closeForm={event => {
              this.handleClose(event);
            }}
            isEdit={this.state.isEdit}
            type={"sell"}
            userId={userId}
            item={this.state.item}
            countries={this.state.countries}
            callLoading={event => {
              this.setState({ isLoad: event });
            }}
          ></ProductForm>
        </Dialog>
        <Dialog
          open={this.state.openMessage}
          onClose={event => {
            this.handleClose(event);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Message</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={event => {
                this.setState({ openMessage: false });
              }}
              color="primary"
            >
              Disagree
            </Button>
            <Button
              onClick={event => {
                this.deleteProduct(event);
              }}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <Backdrop className="backdrop" open={this.state.isLoad}>
          <CircularProgress color="inherit" />
        </Backdrop>
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
