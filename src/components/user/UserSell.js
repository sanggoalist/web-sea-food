import React from "react";
import "./UserSell.scss";
import {
  CircularProgress,
  Divider,
  Checkbox,
  ListItemSecondaryAction,
  Icon,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  TextField,
  Backdrop
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ItemInfo from "../ItemInfo";
import firebase from "../../Firebase";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { getCatgoryName, getCatgoryLinkName } from "../../ultil/CatagoryUltil";
import { getPriceName, getWeightName } from "../../ultil/PriceUltil";
import MoreIcon from "@material-ui/icons/MoreVert";
import { red, green, gray } from "@material-ui/core/colors";

import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import NumberFormat from "react-number-format";

class UserSell extends React.Component {
  constructor(props) {
    super(props);
    this.selectItem = null;
    this.moveToDetail = this.moveToDetail.bind(this);
    this.state = {
      items: [],
      loaded: false,
      anchorEl: null,
      open: false
    };
    this.clickFavorite = this.clickFavorite.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
    this.handleCloseMenuMobile = this.handleCloseMenuMobile.bind(this);
    this.handleOpenMenuMobile = this.handleOpenMenuMobile.bind(this);
  }
  handleOpenMenuMobile(event, item) {
    this.selectItem = item;
    this.setState({ anchorEl: event.currentTarget, open: true });
  }
  handleCloseMenuMobile(event) {
    this.selectItem = null;
    this.setState({ anchorEl: null, open: false });
  }
  componentWillReceiveProps(next) {
    this.selectItem = null;
    this.setState({ anchorEl: null, open: false });
    if (next.reload === true) {
      console.log("Reload");

      this.componentDidMount();
    }
  }
  componentDidMount() {
    var userId = null;
    if (this.props.isUser) {
      userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
    }

    const arr1 = ["shrimp", "cm-crab", "squid", "fish", "other"];
    var ref = !this.props.categoryId
      ? firebase.database().ref(`products`)
      : firebase
          .database()
          .ref(
            `products/${getCatgoryLinkName(this.props.categoryId)}/${
              this.props.type
            }`
          );
    ref.on("value", snapshoot => {
      var obj = {};
      var totalArr = [];
      if (snapshoot.val() !== null) {
        obj = snapshoot.val();
        if (!this.props.categoryId) {
          arr1.forEach(i => {
            var r = [];
            if (obj[i]) {
              r = obj[i][this.props.type];
              if (r) {
                var isUser = this.props["isUser"];
                Object.keys(r).map(function(key) {
                  if (isUser) {
                    if (r[key]["userId"] === userId) {
                      totalArr.push(r[key]);
                    }
                  } else {
                    totalArr.push(r[key]);
                  }
                });
              }
            }
          });
        } else {
          Object.keys(obj).map(function(key) {
            totalArr.push(obj[key]);
          });
        }
      }
      this.setState({ items: totalArr, loaded: true });
    });
  }

  moveToDetail(event, item) {
    if (this.state.open) {
      return;
    }
    for (
      let index = 0;
      index < document.getElementsByTagName("path").length;
      index++
    ) {
      if (event.target === document.getElementsByTagName("path").item(index)) {
        return;
      }
    }
    if (event.target === document.getElementById("more-buton")) {
      return;
    }
    for (
      let index = 0;
      index < document.getElementsByClassName("UserSellActionMobile").length;
      index++
    ) {
      if (
        event.target ===
        document.getElementsByClassName("UserSellActionMobile").item(index)
      ) {
        return;
      }
    }
    for (
      let index = 0;
      index < document.getElementsByClassName("btn-i").length;
      index++
    ) {
      if (
        event.target === document.getElementsByClassName("btn-i").item(index)
      ) {
        return;
      }
    }
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
    for (
      let index = 0;
      index < document.getElementsByClassName("more-id").length;
      index++
    ) {
      if (
        event.target === document.getElementsByClassName("more-id").item(index)
      ) {
        return;
      }
    }
    var category = "";
    var catId = +item["categoryId"];
    if (catId === 1) {
      category = "shrimp";
    } else if (catId === 2) {
      category = "cm-crab";
    } else if (catId === 3) {
      category = "squid";
    } else if (catId === 4) {
      category = "fish";
    } else if (catId === 5) {
      category = "other";
    } else {
      return;
    }
    this.props.history.push(`/items/${catId}/${this.props.type}/${item["id"]}`);
  }
  clickEdit(event, item, mobile) {
    if (mobile) this.props.editing(this.selectItem);
    else this.props.editing(item);
  }
  clickFavorite(event, item1, mobile) {
    var item = mobile ? this.selectItem : item1;
    var category = "";
    var catId = +item["categoryId"];
    if (catId === 1) {
      category = "shrimp";
    } else if (catId === 2) {
      category = "cm-crab";
    } else if (catId === 3) {
      category = "squid";
    } else if (catId === 4) {
      category = "fish";
    } else if (catId === 5) {
      category = "other";
    } else {
      return;
    }
    const ref = firebase
      .database()
      .ref(`products/${category}/${this.props.type}/${item["id"]}`);
    var items = this.state.items;
    items = items.map(i => {
      if (i["id"] === item["id"]) {
        i["isFavor"] = !item["isFavor"];
      }
      return i;
    });

    ref
      .update(item)
      .then(res => {
        this.setState({ items: items });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
    var progess = this.props["isUser"] ? (
      <CircularProgress />
    ) : (
      <Backdrop className="backdrop" open={!this.state.loaded}>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
    return (
      <div className="UserSell">
        {!this.state.loaded ? (
          progess
        ) : (
          <div className="UserSellWrapper">
            <List className="UserSellList">
              {this.state.items.map((item, i) => {
                return (
                  <ListItem
                    key={item["id"]}
                    className="UserSellListItem"
                    alignItems="flex-start"
                    onClickCapture={event => {
                      this.moveToDetail(event, item);
                    }}
                  >
                    <ListItemAvatar className="UserSellImageList">
                      <Avatar className="UserSellImage">
                        <img
                          src={item["imgs"] ? item["imgs"][0]["img"] : ""}
                        ></img>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      disableTypography
                      className="UserSellText"
                      primary={
                        <div className="content-text">
                          <span className="title">{item["title"]}</span>
                          <br></br>
                          {getCatgoryName(item["categoryId"])}&nbsp;
                          <span className="location">({item["location"]})</span>
                        </div>
                      }
                      secondary={
                        ""

                        // <div className="content-text">
                        //   <p className="content">{item["content"]}</p>
                        // </div>
                      }
                    />
                    {userId ? (
                      <ListItemSecondaryAction className="UserSellActionMobile">
                        {userId === item.userId ? (
                          <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            color="inherit"
                            id="more-buton"
                            onClick={event =>
                              this.handleOpenMenuMobile(event, item)
                            }
                          >
                            <MoreIcon className="more-id" />
                          </IconButton>
                        ) : (
                          <IconButton aria-label="show favor" color="inherit">
                            <Icon
                              className="icon-i favor"
                              fontSize="large"
                              style={{ color: red[500] }}
                              onClick={event =>
                                this.clickFavorite(event, item, true)
                              }
                            >
                              {item["isFavor"] ? "favorite" : "favorite_border"}
                            </Icon>
                          </IconButton>
                        )}
                        <Menu
                          id="long-menu"
                          anchorEl={this.state.anchorEl}
                          keepMounted
                          open={this.state.open}
                          onClose={event => this.handleCloseMenuMobile(event)}
                        >
                          <MenuItem>
                            <IconButton aria-label="show favor" color="inherit">
                              <Icon
                                className="icon-i favor"
                                fontSize="large"
                                style={{ color: red[500] }}
                                onClick={event =>
                                  this.clickFavorite(event, item)
                                }
                              >
                                {item["isFavor"]
                                  ? "favorite"
                                  : "favorite_border"}
                              </Icon>
                            </IconButton>
                          </MenuItem>
                          <MenuItem>
                            <IconButton aria-label="show edit" color="inherit">
                              <Icon
                                className="icon-i favor"
                                fontSize="large"
                                style={{ color: green[500] }}
                                onClick={event =>
                                  this.clickEdit(event, item, true)
                                }
                              >
                                edit
                              </Icon>
                            </IconButton>
                          </MenuItem>
                          <MenuItem>
                            <IconButton
                              aria-label="show delete"
                              color="inherit"
                            >
                              <Icon
                                className="icon-i favor"
                                fontSize="large"
                                color="disabled"
                                onClick={event =>
                                  this.props.deleting({
                                    openMessage: true,
                                    message:
                                      "Would you like to delete this product ?",
                                    item: this.selectItem
                                  })
                                }
                              >
                                delete
                              </Icon>
                            </IconButton>
                          </MenuItem>
                        </Menu>
                      </ListItemSecondaryAction>
                    ) : (
                      ""
                    )}
                    {userId && userId === item.userId ? (
                      <ListItemSecondaryAction className="UserSellAction edit">
                        <Icon
                          className="icon-i edit"
                          fontSize="large"
                          onClick={event => this.clickEdit(event, item, false)}
                        >
                          edit
                        </Icon>
                      </ListItemSecondaryAction>
                    ) : (
                      ""
                    )}

                    {userId && userId === item.userId ? (
                      <ListItemSecondaryAction className="UserSellAction">
                        <Icon
                          className="icon-i delete"
                          fontSize="large"
                          onClick={event =>
                            this.props.deleting({
                              openMessage: true,
                              message:
                                "Would you like to delete this product ?",
                              item: item
                            })
                          }
                        >
                          delete
                        </Icon>
                      </ListItemSecondaryAction>
                    ) : (
                      ""
                    )}

                    {userId ? (
                      <ListItemSecondaryAction
                        className={
                          userId === item.userId
                            ? "UserSellAction favor"
                            : "UserSellAction favor favor-user"
                        }
                      >
                        <Icon
                          className="icon-i favor"
                          fontSize="large"
                          onClick={event =>
                            this.clickFavorite(event, item, false)
                          }
                        >
                          {item["isFavor"] ? "favorite" : "favorite_border"}
                        </Icon>
                      </ListItemSecondaryAction>
                    ) : (
                      ""
                    )}

                    <ListItemSecondaryAction className="UserSellActionPrice">
                      <p>
                        {
                          <NumberFormat
                            displayType={"text"}
                            thousandSeparator={true}
                            value={item["price"]}
                          />
                        }
                        {" " + getPriceName(item["categoryId"])}/
                        {getWeightName(item["categoryId"])}
                      </p>
                    </ListItemSecondaryAction>
                    <ListItemSecondaryAction className="UserSellActionText">
                      <p>2019/02/10</p>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(UserSell);
