import React from "react";
import "./ContactInfo.scss";
import { CircularProgress } from "@material-ui/core";
import firebase from "../../Firebase";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import SpringModal from "../../components/SpringModal";
import InfoModal from "../InfoModal";

class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      saveLoading: false,
      infoLoading: false,
      infoText: "",
      user: {
        email: "",
        id: 0,
        info: {
          age: 0,
          fullname: "",
          gender: 0,
          img: "",
          address: "",
          phone: "",
          mobile_phone: ""
        },
        username: ""
      },
      error: {
        info: {
          address: false,
          phone: false,
          mobile_phone: false
        }
      },
      errorText: {
        info: {
          address: "",
          phone: "",
          mobile_phone: ""
        }
      }
    };
  }
  handleChange(event, i, types, isClick) {
    for (let index = 0; index < i.length; index++) {
      const element = i[index];
      const type = types[index];
      var value = !isClick
        ? event.target.value
        : this.state.user.info[`${element}`];
      var item = this.state.user;
      var err = this.state.error;
      var errText = this.state.errorText;
      if (!isClick) {
        err.info[`${element}`] = false;
        errText.info[`${element}`] = "";
        this.setState({ error: err, errorText: errText });
      }
      //Address
      if (type === 1 && !value) {
        err.info[`${element}`] = true;
        errText.info[`${element}`] = "Address is required.";
        this.setState({ error: err, errorText: errText });
      }
      if (type === 1 && value.length > 500) {
        return;
      }
      //Address

      //Phone
      if (type === 2 && !value) {
        err.info[`${element}`] = true;
        errText.info[`${element}`] = "Phone number is required.";
        this.setState({ error: err, errorText: errText });
      }
      if (type === 2 && !new RegExp(/^[0-9]*$/).test(value)) {
        err.info[`${element}`] = true;
        errText.info[`${element}`] = "Phone number is incorrect!";
        this.setState({ error: err, errorText: errText });
      }
      if (type === 2 && value.length > 15) {
        return;
      }

      //Phone

      //Mobile Phone
      if (type === 3 && !value) {
        err.info[`${element}`] = true;
        errText.info[`${element}`] = "Mobile Phone number is required.";
        this.setState({ error: err, errorText: errText });
      }
      if (type === 3 && !new RegExp(/^[0-9]*$/).test(value)) {
        err.info[`${element}`] = true;
        errText.info[`${element}`] = "Mobile Phone number is incorrect!";
        this.setState({ error: err, errorText: errText });
      }
      if (type === 3 && value.length > 15) {
        return;
      }

      //Mobile Phone

      if (!isClick) {
        item.info[`${element}`] = value;
        this.setState({ user: item });
      }
    }
  }
  componentDidMount() {
    const ref = firebase.database().ref(`users/${this.props.userId}`);
    ref.on("value", res => {
      this.setState({ loaded: true, user: res.val() });
    });
  }
  closeModal(event) {
    this.setState({ infoLoading: false, infoText: "" });
  }
  handleSave(event) {
    this.handleChange(
      event,
      ["address", "phone", "mobile_phone"],
      [1, 2, 3],
      true
    );
    var item = this.state.user;
    if (
      this.state.error.info.address ||
      this.state.error.info.phone ||
      this.state.error.info.mobile_phone
    ) {
      return;
    }
    this.setState({ saveLoading: true });
    const ref = firebase.database().ref(`users/${this.props.userId}`);
    const addressRef = firebase
      .database()
      .ref(`public_info/${this.props.userId}/address`);
    const phoneRef = firebase
      .database()
      .ref(`public_info/${this.props.userId}/phone`);
    const mobileRef = firebase
      .database()
      .ref(`public_info/${this.props.userId}/mobile_phone`);
    Promise.all([
      ref.update(item),
      addressRef.set(this.state.user.info.address),
      phoneRef.set(this.state.user.info.phone),
      mobileRef.set(this.state.user.info.mobile_phone)
    ])
      .then(res => {
        this.setState({ saveLoading: false });
        this.setState({ infoLoading: true, infoText: "Success!!!" });
      })
      .catch(err => {
        this.setState({ saveLoading: false });
        this.setState({ infoLoading: true, infoText: "Failed!!! Error!!!" });
      });
  }
  render() {
    return (
      <div className="ContactInfo">
        {!this.state.loaded ? (
          <CircularProgress />
        ) : (
          <div className="ContactInfoWrapper">
            <div className="contact-item">
              <FormControl
                variant="outlined"
                className="form-field"
                error={this.state.error.info.address}
              >
                <InputLabel htmlFor="filled-adornment-address">
                  Address
                </InputLabel>
                <OutlinedInput
                  id="filled-adornment-address"
                  type={"text"}
                  value={this.state.user.info.address}
                  onChange={event => {
                    this.handleChange(event, ["address"], [1], false);
                  }}
                  aria-describedby="address-helper-text"
                  labelWidth={70}
                />
                <FormHelperText id="address-helper-text">
                  {" "}
                  &nbsp;{this.state.errorText.info.address}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="contact-item">
              <FormControl
                variant="outlined"
                className="form-field"
                error={this.state.error.info.phone}
              >
                <InputLabel htmlFor="filled-adornment-phone">Phone</InputLabel>
                <OutlinedInput
                  id="filled-adornment-phone"
                  type={"text"}
                  value={this.state.user.info.phone}
                  onChange={event => {
                    this.handleChange(event, ["phone"], [2], false);
                  }}
                  aria-describedby="phone-helper-text"
                  labelWidth={70}
                />
                <FormHelperText id="phone-helper-text">
                  {" "}
                  &nbsp;{this.state.errorText.info.phone}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="contact-item">
              <FormControl
                variant="outlined"
                className="form-field"
                error={this.state.error.info.mobile_phone}
              >
                <InputLabel htmlFor="filled-adornment-phone-m">
                  Mobile Phone
                </InputLabel>
                <OutlinedInput
                  id="filled-adornment-phone-m"
                  type={"text"}
                  value={this.state.user.info.mobile_phone}
                  onChange={event => {
                    this.handleChange(event, ["mobile_phone"], [3], false);
                  }}
                  aria-describedby="m-phone-helper-text"
                  labelWidth={100}
                />
                <FormHelperText id="m-phone-helper-text">
                  {" "}
                  &nbsp;{this.state.errorText.info.mobile_phone}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="contact-item button">
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
        )}
        {this.state.saveLoading ? (
          <SpringModal load={this.state.saveLoading} />
        ) : (
          ""
        )}
        {this.state.infoLoading ? (
          <InfoModal
            closeFunc={event => {
              this.closeModal();
            }}
            load={this.state.infoLoading}
            text={this.state.infoText}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default ContactInfo;
