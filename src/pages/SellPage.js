import React from "react";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../pages/SellPage.scss";
import ItemInfo from "../components/ItemInfo";
import firebase from "../Firebase";
import SpringModal from "../components/SpringModal";
import UserSell from "../components/user/UserSell";
import { getCatgoryLinkName } from "../ultil/CatagoryUltil";
import ProductForm from "../components/product/ProductForm";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from "@material-ui/core";
import { Transition } from "../components/ItemDetail";

class SellPage extends React.Component {
  constructor(props) {
    super(props);
    this.moveToDetail = this.moveToDetail.bind(this);
    this.state = {
      items: [],
      isLoad: true,
      open: false,
      openForm: false,
      countries: [],
      openMessage: "",
      message: "",
      item: null,
      isEdit: false,
      reload: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
  componentDidMount() {
    var category = "";
    if (+this.props.match.params["id"] === 1) {
      category = "shrimp";
    } else if (+this.props.match.params["id"] === 2) {
      category = "cm-crab";
    } else if (+this.props.match.params["id"] === 3) {
      category = "squid";
    } else if (+this.props.match.params["id"] === 4) {
      category = "fish";
    } else if (+this.props.match.params["id"] === 5) {
      category = "other";
    } else {
      category = "shrimp";
    }
    const ref1 = firebase.database().ref(`countries`);
    ref1.on("value", res => {
      this.setState({ countries: res.val() });
    });
    const ref = firebase.database().ref(`products/${category}/sell`);
    ref.on("value", snapshoot => {
      var arr = [];
      if (snapshoot.val() !== null) {
        var item = snapshoot.val();
        arr = Object.keys(item).map(function(key) {
          return item[key];
        });
      }

      this.setState({
        items: snapshoot.val() == null ? [] : arr,
        isLoad: false
      });
    });
  }
  moveToDetail(event, index) {
    // event.stopPropagation();
    for (
      let index = 0;
      index < document.getElementsByClassName("icon-i").length;
      index++
    ) {
      if (
        event.target === document.getElementsByClassName("icon-i").item(index)
      ) {
        return;
      }
    }
    this.props.history.push(
      `/items/${this.props.match.params["id"]}/sell/${index}`
    );
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
    const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
    return (
      <div className="SellPage">
        {/* {this.state.isLoad ? (
          <SpringModal load={this.state.isLoad} />
        ) : ( */}
        <div className="SellPageWrapper">
          <Grid container spacing={3} className="SellPageContainer">
            <UserSell
              type="sell"
              isUser={false}
              reload={this.state.reload}
              categoryId={+this.props.match.params["id"]}
              editing={event => {
                this.handleEdit(event);
              }}
              deleting={event => {
                this.handleDelete(event);
              }}
            />
          </Grid>
        </div>
        {/* )} */}
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
            isEdit={true}
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
      </div>
    );
  }
}
export default withRouter(SellPage);
