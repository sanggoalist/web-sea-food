import React from "react";
import { withRouter } from "react-router-dom";
import "./ItemDetail.scss";
import Icon from "@material-ui/core/Icon";
import firebase from "../Firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import SpringModal from "./SpringModal";
import {
  Card,
  Backdrop,
  Dialog,
  Slide,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@material-ui/core";
import UserInfo from "./product/UserInfo";
import { getCatgoryLinkName } from "../ultil/CatagoryUltil";
import { getPriceName, getWeightName } from "../ultil/PriceUltil";
import ImageGallery from "react-image-gallery";
import ProductForm from "./product/ProductForm";
import EditIcon from "@material-ui/icons/Edit";
import NumberFormat from "react-number-format";
class ItemDetail extends React.Component {
  categoryId = null;
  oldItem = null;
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      isFaverite: false,
      isLoad: true,
      isOpen: false,
      openMessage: "",
      message: "",
      countries: [],
      item: {
        id: 0,
        location: "",
        isFavor: false,
        title: "",
        price: 0,
        content: "",
        img: "",
        imgs: [],
        userId: -1,
        categoryId: -1,
        priceUnit: 1,
        weightUnit: 1
      }
    };
    this.clickFavorite = this.clickFavorite.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }
  componentDidMount() {
    this.mounted = true;
    const ref1 = firebase.database().ref(`countries`);
    ref1.on("value", res => {
      this.setState({ countries: res.val() });
    });
    const ref = firebase
      .database()
      .ref(
        `products/${getCatgoryLinkName(+this.props.match.params["id"])}/sell/${
          this.props.match.params["idd"]
        }`
      );
    ref.on("value", snapshoot => {
      if (snapshoot.val()) {
        const v = snapshoot.val();
        this.oldItem = v;
        this.setState({
          item: snapshoot.val(),
          isLoad: false
        });
      }
    });
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  deleteProduct(event) {
    if (this.mounted) {
      this.setState({ isLoad: true });
      const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
      const refImg = firebase
        .storage()
        .ref(`/images/${userId}/products/${this.props.match.params["idd"]}`);
      refImg.list().then(res => {
        const ref = firebase
          .database()
          .ref(
            `products/${getCatgoryLinkName(
              +this.props.match.params["id"]
            )}/sell/${this.props.match.params["idd"]}`
          );
        var con = res.items.map(i => {
          const refi = firebase
            .storage()
            .ref(
              `/images/${userId}/products/${this.props.match.params["idd"]}/${i.name}`
            );
          return refi.delete();
        });
        Promise.all([ref.set(null), con])
          .then(res => {
            this.setState({ isLoad: false });
            this.props.history.push(`/home`);
          })
          .catch(err => {
            this.setState({ openMessage: true, message: "Error!" });
          });
      });
    }
  }
  clickFavorite() {
    const ref = firebase
      .database()
      .ref(
        `products/${getCatgoryLinkName(+this.props.match.params["id"])}/sell/${
          this.props.match.params["idd"]
        }`
      );
    const item = this.state.item;
    item.isFavor = !this.state.item.isFavor;
    ref
      .update(item)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  }
  handleClose(event) {
    // window.location.reload(false);
    this.componentDidMount();
    this.setState({ isOpen: false });
  }
  handleOpenDialog(event) {
    this.setState({ isOpen: true });
  }
  render() {
    const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
    var images = [];
    if (this.state.item.imgs !== undefined) {
      images = this.state.item.imgs.map(im => {
        return {
          original: im.img,
          thumbnail: im.img
        };
      });
    }

    return (
      <div>
        {this.state.isLoad ? (
          <Backdrop className="backdrop" open={this.state.isLoad}>
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <div className="ItemDetail">
            <div className="d-title-wrapper">
              <div className="d-title">
                {userId === this.state.item.userId ? (
                  <Icon
                    className="dd-icon delete"
                    fontSize="large"
                    onClick={event =>
                      this.setState({
                        openMessage: true,
                        message: "Would you like to delete this product ?"
                      })
                    }
                  >
                    delete
                  </Icon>
                ) : (
                  ""
                )}
                {userId === this.state.item.userId ? (
                  <Icon
                    className="dd-icon edit"
                    fontSize="large"
                    onClick={event => this.handleOpenDialog(event)}
                  >
                    edit
                  </Icon>
                ) : (
                  ""
                )}

                {userId === this.state.item.userId ? (
                  <Icon
                    className="dd-icon"
                    fontSize="large"
                    onClick={event => this.clickFavorite()}
                  >
                    {this.state.item.isFavor ? "favorite" : "favorite_border"}
                  </Icon>
                ) : (
                  ""
                )}
                <div className="dd-title">{this.state.item.title}</div>
              </div>
            </div>
            <div className="detail-img-wrapper">
              {/* <img
              src= {this.state.item.img}
              alt="Detail Picture"
            ></img> */}
              {images.length > 0 ? (
                <ImageGallery showIndex={true} items={images} />
              ) : (
                ""
              )}
            </div>
            <div className="d-title-wrapper">
              <Card>
                <UserInfo userId={this.state.item.userId} />
              </Card>
            </div>
            <div className="d-content">
              <div className="d-content-location">
                <Icon>place</Icon>
                <div>{this.state.item.location}</div>
              </div>
              <div className="d-content-price">
                {
                  <NumberFormat
                    displayType={"text"}
                    thousandSeparator={true}
                    value={this.state.item["price"]}
                  />
                }
                {" " + getPriceName(this.state.item["priceUnit"])}/
                {getWeightName(this.state.item["weightUnit"])}
              </div>

              <div
                className="d-content-main"
                dangerouslySetInnerHTML={{ __html: this.state.item.content }}
              ></div>
            </div>
          </div>
        )}
        <Dialog
          fullScreen
          open={this.state.isOpen}
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
            old={this.oldItem}
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
export default withRouter(ItemDetail);
export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
