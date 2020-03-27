import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import Slide from "@material-ui/core/Slide";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

import "./ProductForm.scss";
import {
  TextField,
  Select,
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  GridList,
  GridListTile,
  GridListTileBar,
  ButtonGroup,
  Backdrop,
  CircularProgress
} from "@material-ui/core";
import { getCatgoryLinkName } from "../../ultil/CatagoryUltil";
import moment, { months } from "moment";
import NumberFormat from "react-number-format";
import firebase from "../../Firebase";
import EditText from "../EditText";
import { withRouter } from "react-router-dom";

class ProductForm extends React.Component {
  content = "";
  newFile = [];
  deleteFile = [];
  fileRes = [];
  categoryId = null;
  constructor(props) {
    super(props);

    this.state = {
      isLoad: false,
      imgSrc: [],
      maxWidth: 501,
      item: {
        title: "",
        content: "",
        price: 0,
        categoryId: "",
        img: "",
        imgs: [],
        id: 0,
        isFavor: false,
        location: "",
        priceUnit: 1,
        weightUnit: 1
      },
      errorContent: "",
      openDiaglog: false,
      diaglogContent: "",
      isSave: false,
      error: {
        title: false,
        content: false,
        price: false,
        categoryId: false,
        img: true,
        location: false,
        priceUnit: false,
        weightUnit: false
      },
      errorText: {
        title: "",
        content: "",
        price: "",
        categoryId: "",
        img: "",
        location: "",
        priceUnit: "",
        weightUnit: ""
      }
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleContent = this.handleContent.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.imageMoveToTheLeft = this.imageMoveToTheLeft.bind(this);
    this.imageMoveToTheRight = this.imageMoveToTheRight.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions());
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ maxWidth: window.innerWidth });
  }
  uploadImage(event) {
    if (event.target.files) {
      /* Get files in array form */
      const files = Array.from(event.target.files);

      /* Map each file to a promise that resolves to an array of image URI's */

      Promise.all(
        files.map(file => {
          this.newFile.push(file);
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", ev => {
              resolve(ev.target.result);
            });
            reader.addEventListener("error", reject);
            reader.readAsDataURL(file);
          });
        })
      ).then(
        images => {
          /* Once all promises are resolved, update state with image URI array */
          var item = this.state.item;
          images.forEach((v, i) => {
            item.imgs.push({
              imageId: "new-" + i,
              in: i,
              img: v,
              isUpload: false
            });
          });
          this.setState({ item: item });
        },
        error => {
          console.error(error);
        }
      );
    }
  }
  componentDidMount() {
    if (this.props.isEdit) {
      this.content = this.props.item.content;
      var item = this.props.item;
      if (item["imgs"] === undefined) {
        item["imgs"] = [];
      }
      this.categoryId = item["categoryId"];
      this.setState({ item: item });
    }
  }
  imageMoveToTheLeft(event, img, index) {
    if (index === 0) {
      return;
    } else {
      var imgs = this.state.item.imgs;
      this.state.item.imgs.forEach((v, i) => {
        if (i === index - 1) {
          imgs[i] = img;
          imgs[index] = v;
        }
      });
      var item = this.state.item;
      item.imgs = imgs;
      this.setState({ item: item });
    }
  }
  imageMoveToTheRight(event, img, index) {
    if (index === this.state.item.imgs.length - 1) {
      return;
    } else {
      var imgs = this.state.item.imgs;
      this.state.item.imgs.forEach((v, i) => {
        if (i === index + 1) {
          imgs[i] = img;
          imgs[index] = v;
        }
      });
      var item = this.state.item;
      item.imgs = imgs;
      this.setState({ item: item });
    }
  }
  deleteImage(event, img, index) {
    if (this.state.item.imgs.length === 1) {
      return;
    } else {
      var imgs = this.state.item.imgs.filter((v, i) => i !== index);
      if (img.isUpload) {
        this.deleteFile.push(img);
      }
      var item = this.state.item;
      item.imgs = imgs;
      this.setState({ item: item });
    }
  }

  handleClose(event) {
    this.content = "";
    this.newFile = [];
    this.deleteFile = [];
    this.fileRes = [];
    this.props.closeForm(event);
  }
  handleDialogClose(event) {
    this.setState({ openDiaglog: false });
  }
  handleChange(event, i, types, isClick) {
    for (let index = 0; index < i.length; index++) {
      const element = i[index];
      const type = types[index];
      var value = !isClick ? event.target.value : this.state.item[`${element}`];
      var item = this.state.item;
      var err = this.state.error;
      var errText = this.state.errorText;
      if (!isClick) {
        err[`${element}`] = false;
        errText[`${element}`] = "";
        this.setState({ error: err, errorText: errText });
      }

      if (!value) {
        err[`${element}`] = true;
        errText[`${element}`] = `${element[0].toUpperCase() +
          element.slice(1)} is required.`;
        this.setState({ error: err, errorText: errText });
      }
      //Title
      if (type === 1 && value.length > 100) {
        return;
      }
      if (type === 1 && value.length < 4) {
        err[`${element}`] = true;
        errText[`${element}`] = "Title is too short.";
        this.setState({ error: err, errorText: errText });
      }
      //Title

      //Content
      if (type === 2 && value.length > 1000) {
        return;
      }

      //Content
      //Price
      if (type === 3 && value.length > 0) {
        if (Number.isNaN(+value)) {
          err[`${element}`] = true;
          errText[`${element}`] = "Price should be number format.";
          this.setState({ error: err, errorText: errText });
        } else {
          if (Number.parseInt(value) < 0) {
            err[`${element}`] = true;
            errText[`${element}`] = "Price should be positive number.";
            this.setState({ error: err, errorText: errText });
          }
        }
        if (value.length > 12) {
          return;
        }
      }

      //Price

      if (!isClick) {
        item[`${element}`] = value;
        this.setState({ item: item });
      }
    }
  }
  handleContent(event) {
    this.content = event;
  }
  handleSave(event) {
    this.handleChange(
      event,
      [
        "title",
        "content",
        "price",
        "categoryId",
        "location",
        "priceUnit",
        "weightUnit"
      ],
      [1, 2, 3, 4, 5, 6, 7],
      true
    );
    var errText = this.state.errorText;

    if (
      this.state.error.title ||
      this.state.error.price ||
      this.state.error.categoryId ||
      this.state.error.location
    ) {
      return;
    }
    if (this.content.length > 1000) {
      this.setState({
        openDiaglog: true,
        diaglogContent: "The content is too long."
      });
      return;
    }
    if (!this.props.isEdit && this.newFile.length === 0) {
      this.setState({
        openDiaglog: true,
        diaglogContent: "Please select at least 1 image."
      });
      return;
    }
    this.props.callLoading(true);
    this.setState({ isSave: true });
    if (true) {
      var item = this.state.item;
      item.content = this.content;
      var id = !this.props.isEdit ? moment().unix() : item["id"];
      var deletePromise = new Promise((resolve, reject) => {
        this.deleteFile.map(file => {
          var refImg = firebase
            .storage()
            .ref(
              `/images/${this.props.userId}/products/${id}/${file["imageId"]}`
            );
          refImg
            .delete()
            .then(res => {
              resolve({ deleted: true });
            })
            .catch({ deleted: false });
        });
      });
      var uploadPromise = Promise.all(
        this.newFile.map((file, index) => {
          return new Promise((resolve, reject) => {
            var imageId =
              this.props.userId +
              "_" +
              item.id +
              "_" +
              moment().unix() +
              "_" +
              index;
            firebase
              .storage()
              .ref(`/images/${this.props.userId}/products/${id}/${imageId}`)
              .put(file, { contentEncoding: "" })
              .then(res => {
                firebase
                  .storage()
                  .ref(`/images/${this.props.userId}/products/${id}/${imageId}`)
                  .getDownloadURL()
                  .then(res => {
                    resolve({ img: res, id: imageId });
                  })
                  .catch(err => reject(err));
              })
              .catch(err => reject(err));
          });
        })
      );
      uploadPromise.then(res => {
        var arr = [];
        item.imgs.forEach((v, i) => {
          if (v.isUpload === false) {
            var r = res[+v["imageId"][v["imageId"].length - 1]];
            item.imgs[i] = {
              imageId: r["id"],
              img: r["img"],
              isUpload: true
            };
          }
        });
        item.imgs.forEach((v, i) => {
          if (v.isUpload === true) {
            arr.push(v);
          }
        });
        item.imgs = arr;
        if (!this.props.isEdit) {
          item["id"] = id;
          item["isFavor"] = false;
          item["userId"] = this.props.userId;
        }
        const ref = firebase
          .database()
          .ref(
            `products/${getCatgoryLinkName(item.categoryId)}/${
              this.props.type
            }/${item["id"]}`
          );
        ref.update(item).then(res => {
          if (this.categoryId && this.categoryId !== item.categoryId) {
            const dref = firebase
              .database()
              .ref(
                `products/${getCatgoryLinkName(this.categoryId)}/${
                  this.props.type
                }/${this.props.item["id"]}`
              );
            dref.set(null).then(res => {
              this.props.history.push(
                `/items/${item.categoryId}/${this.props.type}/${item.id}`
              );
            });
          }
          this.setState({ isSave: true });
          this.setState({ isLoad: false });
          this.props.callLoading(false);
          this.props.closeForm(true);
        });
      });
    }
  }
  render() {
    NumberFormatCustom.propTypes = {
      inputRef: PropTypes.func.isRequired,
      onChange: PropTypes.func.isRequired
    };
    const categories = [
      {
        value: 1,
        label: "Shrimp"
      },
      {
        value: 2,
        label: "Ca mau Crab"
      },
      {
        value: 3,
        label: "Squid"
      },
      {
        value: 4,
        label: "Fish"
      },
      {
        value: 5,
        label: "Other"
      }
    ];

    return (
      <div className="ProductForm">
        <AppBar className="ProductFormAppBar">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={event => {
                this.handleClose(false);
              }}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className="ProductFormTitle">
              {this.props.item
                ? "Edit Product: " + this.props.item["id"]
                : "New Product"}
            </Typography>
            {this.state.isSave ? <CircularProgress color="inherit" /> : ""}
            <Button
              autoFocus
              color="inherit"
              onClick={event => {
                this.handleSave(event);
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className="fieldWrapper">
          <div className="product-item">
            <FormControl
              variant="outlined"
              className="form-field"
              error={this.state.error.title}
            >
              <InputLabel htmlFor="filled-adornment-title">Title</InputLabel>
              <OutlinedInput
                id="filled-adornment-title"
                type={"text"}
                value={this.state.item.title}
                onChange={event => {
                  this.handleChange(event, ["title"], [1], false);
                }}
                aria-describedby="title-helper-text"
                labelWidth={50}
              />
              <FormHelperText id="title-helper-text">
                {" "}
                &nbsp;{this.state.errorText.title}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="product-item">
            <FormControl
              variant="outlined"
              className="form-field"
              error={this.state.error.price}
            >
              <InputLabel htmlFor="filled-adornment-price">Price</InputLabel>
              <OutlinedInput
                id="filled-adornment-price"
                type={"text"}
                value={this.state.item.price}
                inputComponent={NumberFormatCustom}
                onChange={event => {
                  this.handleChange(event, ["price"], [3], false);
                }}
                aria-describedby="price-helper-text"
                labelWidth={50}
                endAdornment={
                  <InputAdornment position="end">
                    <FormControl variant="outlined">
                      <Select
                        className="price-select"
                        value={this.state.item.priceUnit}
                        displayEmpty
                        onChange={event => {
                          this.handleChange(event, ["priceUnit"], [6], false);
                        }}
                      >
                        <MenuItem value={1}>VND</MenuItem>
                        <MenuItem value={2}>USD</MenuItem>
                        <MenuItem value={3}>YEN</MenuItem>
                      </Select>
                    </FormControl>
                    <div>/</div>
                    <FormControl variant="outlined">
                      <Select
                        className="price-select"
                        value={this.state.item.weightUnit}
                        displayEmpty
                        onChange={event => {
                          this.handleChange(event, ["weightUnit"], [7], false);
                        }}
                      >
                        <MenuItem value={1}>kg</MenuItem>
                        <MenuItem value={2}>gr</MenuItem>
                        <MenuItem value={3}>ton</MenuItem>
                      </Select>
                    </FormControl>
                  </InputAdornment>
                }
              />
              <FormHelperText id="price-helper-text">
                {" "}
                &nbsp;{this.state.errorText.price}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="product-item">
            <FormControl
              variant="outlined"
              className="form-field"
              error={this.state.error.categoryId}
            >
              <TextField
                id="outlined-select-currency"
                select
                label="Category"
                value={this.state.item.categoryId}
                error={this.state.error.categoryId}
                aria-describedby="categoryId-helper-text"
                helperText="Please select your catagory"
                onChange={event => {
                  this.handleChange(event, ["categoryId"], [4], false);
                }}
                variant="outlined"
              >
                {categories.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <FormHelperText id="categoryId-helper-text">
                {" "}
                &nbsp;
              </FormHelperText>
            </FormControl>
          </div>
          <div className="product-item">
            <FormControl
              variant="outlined"
              className="form-field"
              error={this.state.error.location}
            >
              <TextField
                id="outlined-select-location"
                select
                label="Location"
                value={this.state.item.location}
                error={this.state.error.location}
                aria-describedby="location-helper-text"
                onChange={event => {
                  this.handleChange(event, ["location"], [5], false);
                }}
                helperText="Please select your location"
                variant="outlined"
              >
                {this.props.countries.map(option => (
                  <MenuItem key={option["area"]} value={option["province"]}>
                    {option["province"]}
                  </MenuItem>
                ))}
              </TextField>
              <FormHelperText id="location-helper-text"> &nbsp;</FormHelperText>
            </FormControl>
          </div>
          <div className="product-item">
            <EditText
              content={this.state.item.content}
              sendContent={event => {
                this.handleContent(event);
              }}
            ></EditText>
          </div>
          <div className="product-item image-group">
            <GridList
              className="grid-list"
              cols={this.state.maxWidth > 500 ? 2.5 : 1}
            >
              {this.state.item.imgs.map((img, index) => (
                <GridListTile key={img["imageId"]}>
                  <img src={img["img"]} alt={"No"} />
                  <GridListTileBar
                    className="gridlistTile"
                    actionIcon={
                      <ButtonGroup
                        variant="contained"
                        aria-label="large outlined primary button group"
                      >
                        {index !== 0 ? (
                          <IconButton
                            color="primary"
                            onClick={event => {
                              this.imageMoveToTheLeft(event, img, index);
                            }}
                          >
                            <ArrowBackIosIcon />
                          </IconButton>
                        ) : (
                          ""
                        )}
                        {this.state.item.imgs.length > 1 ? (
                          <IconButton
                            color="secondary"
                            onClick={event => {
                              this.deleteImage(event, img, index);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        ) : (
                          ""
                        )}
                        {index < this.state.item.imgs.length - 1 ? (
                          <IconButton
                            color="primary"
                            onClick={event => {
                              this.imageMoveToTheRight(event, img, index);
                            }}
                          >
                            <ArrowForwardIosIcon />
                          </IconButton>
                        ) : (
                          ""
                        )}{" "}
                      </ButtonGroup>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
          <div className="product-item">
            <input
              accept="image/*"
              id="icon-button-file-product"
              type="file"
              multiple="multiple"
              onChange={event => {
                this.uploadImage(event);
              }}
            />
            <label htmlFor="icon-button-file-product">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
        </div>
        <div>
          <Dialog
            open={this.state.openDiaglog}
            onClose={event => this.handleDialogClose(event)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Alert</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {this.state.diaglogContent}
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }
}
export default withRouter(ProductForm);

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      isNumericString
      //   prefix="$"
    />
  );
}
