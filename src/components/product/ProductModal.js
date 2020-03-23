import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs'; 
import { Card, Typography, TextField, MenuItem, IconButton, CircularProgress } from '@material-ui/core';
import './ProductModal.scss';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import firebase from '../../Firebase';
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { getCatgoryLinkName } from '../../ultil/CatagoryUltil';
import moment, { months } from 'moment';
import SpringModal from '../SpringModal';
class ProductModal extends React.Component {
    
  constructor(props){
    super(props);
    this.state = {
        open: false,
        loaded: false,
        isLoad: false,
        countries: [],
        imgSrc: [],
        file: null,
        item: {
            title: "",
            content: "",
            price: "",
            categoryId: "",
            img: "",
            location: ""
        },
        error: {
            title: false,
            content: false,
            price: false,
            categoryId: false,
            img: true,
            location: false
        },
        errorText: {
            title: "",
            content: "",
            price: "",
            categoryId: "",
            img: "",
            location: ""
        }
    }
    this.handleChange = this.handleChange.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.props.closeFunc();
    this.clearForm();
    this.setState({open: false});
  };

  clearForm() {
    this.setState({
      imgSrc: [],
      file: null,
      item: {
          title: "",
          content: "",
          price: "",
          categoryId: "",
          img: "",
          location: ""
      },
      error: {
          title: false,
          content: false,
          price: false,
          categoryId: false,
          img: true,
          location: false
      },
      errorText: {
          title: "",
          content: "",
          price: "",
          categoryId: "",
          img: "",
          location: ""
      }
    });
  }
  uploadImage(event) {

    if (event.target.files[0]) {
    // Assuming only image
    var err = this.state.error;
    var errText = this.state.errorText;
    err['img'] = false;
    errText['img'] = "";
    var file = event.target.files[0];
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);
    reader.onloadend = function (e) {
        this.setState({
            imgSrc: [reader.result],
            errorText: errText,
            error: err,
            file: file
        })
      }.bind(this);
    }
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
  handleSave(event) {
    
        this.handleChange(
        event,
        ["title", "content", "price", "categoryId", "location"],
        [1, 2, 3, 4, 5],
        true
        );
        var errText = this.state.errorText;

        if (
        this.state.error.title ||
        this.state.error.content ||
        this.state.error.price ||
        this.state.error.categoryId ||
        this.state.error.location 
        ) {
        return;
        }
        if (this.state.error.img || this.state.file === null) {
            errText['img'] = "Please select your photo.";
            this.setState({errorText: errText});
            return;
        }
        this.setState({isLoad: true});
        var id = moment().unix();
        firebase
        .storage()
        .ref(`/images/${this.props.userId}/${id}`)
        .put(this.state.file, { contentEncoding: "" })
        .then(res => {
          firebase
            .storage()
            .ref(`/images/${this.props.userId}/${id}`)
            .getDownloadURL()
            .then(res => {
                var item = this.state.item;
                item.img = res;
                item['id'] = id;
                item['isFavor'] = false;
                item['userId'] = this.props.userId;
                const ref = firebase.database().ref(`products/${getCatgoryLinkName(item.categoryId)}/${this.props.type}/${id}`);
                ref.set(item).then(res => {
                    this.setState({isLoad: false, open: false});
                }).catch(err => {

                });
            });
        });
    }
  componentWillReceiveProps(nextProps){
      this.setState({open: nextProps.openIt});
  }
  componentDidMount(){
    const ref = firebase.database().ref(`countries`);
    ref.on('value', res => {
        this.setState({loaded: true, countries: res.val()});
    })
  }

    render() {

          const categories = [
            {
              value: 1,
              label: 'Shrimp'
            },
            {
              value: 2,
              label: 'Ca mau Crab',
            },
            {
              value: 3,
              label: 'Squid',
            },
            {
              value: 4,
              label: 'Fish',
            },
            {
               value: 5,
               label: 'Other',
            },
          ];
      return (
        <div className="ProductModal">
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={this.state.open}
                onClose={this.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={this.state.open}>
                {!this.state.loaded ? (
                <CircularProgress />
                ) :
                <div className = "ModalCard">
                    <Card>
                        <div className = "ProductWrapper">
                            <div className = "product-item">
                                <Typography variant="h3" gutterBottom>
                                    Create New Sell Product
                                </Typography>
                            </div>
                            <div className = "product-item">
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.error.title}>
                                    <InputLabel htmlFor="filled-adornment-title">Title</InputLabel>
                                    <OutlinedInput
                                    
                                        id="filled-adornment-title"
                                        type={'text'}
                                        value={this.state.item.title}
                                        onChange={event => {this.handleChange(event, ["title"], [1], false)}}
                                        aria-describedby="title-helper-text"
                                        // endAdornment={
                                        // <InputAdornment position="end">
                                        // </InputAdornment>
                                        // }
                                        labelWidth={50}
                                    />
                                    <FormHelperText id="title-helper-text"> &nbsp;{this.state.errorText.title}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "product-item">
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.error.content}>
                                <TextField
                                        id="content-helper-text"
                                        label="Content"
                                        multiline
                                        rows="10"
                                        variant="outlined"
                                        error  = {this.state.error.content}
                                        onChange={event => {this.handleChange(event, ["content"], [2], false)}}
                                        />
                                    <FormHelperText id="content-helper-text"> &nbsp;{this.state.errorText.content}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "product-item">
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.error.price}>
                                    <InputLabel htmlFor="filled-adornment-price">Price</InputLabel>
                                    <OutlinedInput
                                    
                                        id="filled-adornment-price"
                                        type={'text'}
                                        value={this.state.item.price}
                                        onChange={event => {this.handleChange(event, ["price"], [3], false)}}
                                        aria-describedby="price-helper-text"
                                        labelWidth={50}
                                    />
                                    <FormHelperText id="price-helper-text"> &nbsp;{this.state.errorText.price}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "product-item">
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.error.categoryId}>
                                <TextField
                                        id="outlined-select-currency"
                                        select
                                        label="Category"
                                        value={this.state.item.categoryId}
                                        error  = {this.state.error.categoryId}
                                        aria-describedby="categoryId-helper-text"
                                        helperText="Please select your catagory"
                                        onChange={event => {this.handleChange(event, ["categoryId"], [4], false)}}
                                        variant="outlined"
                                        >
                                        {categories.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                            </MenuItem>
                                        ))}
                                        </TextField>
                                    <FormHelperText id="categoryId-helper-text"> &nbsp;</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "product-item">
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.error.location}>
                                <TextField
                                        id="outlined-select-location"
                                        select
                                        label="Location"
                                        value={this.state.item.location}
                                        error  = {this.state.error.location}
                                        aria-describedby="location-helper-text"
                                        onChange={event => {this.handleChange(event, ["location"], [5], false)}}
                                        helperText="Please select your location"
                                        variant="outlined"
                                        >
                                        {this.state.countries.map(option => (
                                            <MenuItem key={option['area']} value={option['province']}>
                                            {option['province']}
                                            </MenuItem>
                                        ))}
                                        </TextField>
                                    <FormHelperText id="location-helper-text"> &nbsp;</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "product-item image">
                                <img src={this.state.imgSrc} />
                            </div>
                            <div className = "product-item">
                            
                            <input
                                    accept="image/*"
                                    id="icon-button-file-product"
                                    type="file"
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
                                    <div> &nbsp;{this.state.errorText.img}</div>
                            </div>
                            <div className="product-item button">
                                <Button
                                    variant="contained"
                                    onClick={event => {
                                    this.handleSave(event);
                                    }}
                                    color="primary"
                                    startIcon={<SaveIcon />}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>}
                {(this.state.isLoad ? <SpringModal load={this.state.isLoad}/>: '')}
                </Fade>
            </Modal>
        </div>
      );
    }
}
export default ProductModal;
export const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
      from: { opacity: 0 },
      to: { opacity: open ? 1 : 0 },
      onStart: () => {
        if (open && onEnter) {
          onEnter();
        }
      },
      onRest: () => {
        if (!open && onExited) {
          onExited();
        }
      },
    });
    Fade.propTypes = {
        children: PropTypes.element,
        in: PropTypes.bool.isRequired,
        onEnter: PropTypes.func,
        onExited: PropTypes.func,
      };

  
    return (
      <animated.div ref={ref} style={style} {...other}>
        {children}
      </animated.div>
    );
  });