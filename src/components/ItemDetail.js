import React from "react";
import { withRouter } from "react-router-dom";
import "./ItemDetail.scss";
import Icon from "@material-ui/core/Icon";
import firebase from "../Firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import SpringModal from "./SpringModal";
import { Card } from "@material-ui/core";
import UserInfo from "./product/UserInfo";
import { getCatgoryLinkName } from "../ultil/CatagoryUltil";

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFaverite: false,
      isLoad: true,
      item: {
        id: 0,
        location: "",
        isFavor: false,
        title: "",
        price: 0,
        content: "",
        img: "",
        userId: -1
      }
    };
    this.clickFavorite = this.clickFavorite.bind(this);
  }
  componentDidMount() {
    const ref = firebase
      .database()
      .ref(`products/${getCatgoryLinkName(+(this.props.match.params['id']))}/sell/${this.props.match.params["idd"]}`);
    ref.on("value", snapshoot => {
      this.setState({ item: snapshoot.val(), isLoad: false });
    });
  }
  clickFavorite() {
    const ref = firebase
      .database()
      .ref(`products/${getCatgoryLinkName(+(this.props.match.params['id']))}/sell/${this.props.match.params["idd"]}`);
    const item = this.state.item;
    item.isFavor = !this.state.item.isFavor;
    ref
      .update(item)
      .then(res => {})
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div>
         {this.state.isLoad ? <SpringModal load={this.state.isLoad} /> : 
        <div className="ItemDetail">
         
          <div className="detail-img-wrapper">
            <img
              src= {this.state.item.img}
              alt="Detail Picture"
            ></img>
          </div>
          <div className="d-title-wrapper">
          <Card>
              <UserInfo userId = {this.state.item.userId}/>
            </Card>
            <div className="d-title">
              <div className="dd-title">{this.state.item.title}</div>
              <Icon
                className="dd-icon"
                fontSize="large"
                onClick={event => this.clickFavorite()}
              >
                {this.state.item.isFavor ? "favorite" : "favorite_border"}
              </Icon>
            </div>
          </div>
          <div className="d-content">
            <div className="d-content-price">{this.state.item.price} $</div>
            <div className="d-content-location">
              <Icon>place</Icon>
              <div>{this.state.item.location}</div>
            </div>
            <div className="d-content-main">{this.state.item.content}</div>
          </div>
        </div>}
      </div>
    );
  }
}
export default withRouter(ItemDetail);
