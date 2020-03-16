import React from "react";
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
import "./BasicInfo.scss";
import InfoModal from "../InfoModal";

class BasicInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        id: 0,
        info: {
          age: 0,
          fullname: "",
          gender: 0,
          img: ""
        },
        username: ""
      },
      loaded: false,
      saveLoading: false,
      infoLoading: false,
      infoText: "",
      error: {
        info: {
          fullname: false
        }
      },
      errorText: {
        info: {
          fullname: false
        }
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentDidMount() {
    const ref = firebase.database().ref(`users/${this.props.userId}`);
    ref.on("value", res => {
      this.setState({ loaded: true, user: res.val() });
    });
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
      //Full Name
      if (type === 1 && !value) {
        err.info[`${element}`] = true;
        errText.info[`${element}`] = "Fullname is required.";
        this.setState({ error: err, errorText: errText });
      }
      if (type === 1 && value.length > 100) {
        return;
      }
      //Full Name

      //Age

      if (type === 2 && value.length > 5) {
        return;
      }
      if (type === 2 && value.length > 0) {
        if (Number.isNaN(Number.parseInt(value))) {
          err.info[`${element}`] = true;
          errText.info[`${element}`] = "Age should be number format.";
          this.setState({ error: err, errorText: errText });
        } else {
          if (Number.parseInt(value) < 0) {
            err.info[`${element}`] = true;
            errText.info[`${element}`] = "Age should be positive number.";
            this.setState({ error: err, errorText: errText });
          }
        }
      }

      //Age

      if (!isClick) {
        if (type === 3) {
          item.info[`${element}`] = +value;
        } else {
          item.info[`${element}`] = value;
        }

        this.setState({ user: item });
      }
    }
  }
  handleSave(event) {
    this.handleChange(event, ["fullname", "age", "gender"], [1, 2, 3], true);
    var item = this.state.user;
    if (this.state.error.info.fullname) {
      return;
    }
    this.setState({ saveLoading: true });
    const ref = firebase.database().ref(`users/${this.props.userId}`);
    ref
      .update(item)
      .then(res => {
        this.setState({ saveLoading: false });
        this.setState({ infoLoading: true, infoText: "Success!!!" });
      })
      .catch(err => {
        this.setState({ saveLoading: false });
        this.setState({ infoLoading: true, infoText: "Failed!!! Error!!!" });
      });
  }
  closeModal(event) {
    this.setState({ infoLoading: false, infoText: "" });
  }
  render() {
    return (
      <div className="BasicInfo">
        {!this.state.loaded ? (
          <CircularProgress />
        ) : (
          <div className="BasicInfoWrapper">
            <div className="info-item">
              <FormControl
                variant="outlined"
                className="form-field"
                error={this.state.error.info.fullname}
              >
                <InputLabel htmlFor="filled-adornment-fullname">
                  Fullname
                </InputLabel>
                <OutlinedInput
                  id="filled-adornment-fullname"
                  type={"text"}
                  value={this.state.user.info.fullname}
                  onChange={event => {
                    this.handleChange(event, ["fullname"], [1], false);
                  }}
                  aria-describedby="fullname-helper-text"
                  labelWidth={70}
                />
                <FormHelperText id="fullname-helper-text">
                  {" "}
                  &nbsp;{this.state.errorText.info.fullname}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="info-item">
              <FormControl
                variant="outlined"
                className="form-field"
                error={this.state.error.info.age}
              >
                <InputLabel htmlFor="filled-adornment-age">Age</InputLabel>
                <OutlinedInput
                  id="filled-adornment-age"
                  type={"number"}
                  value={this.state.user.info.age}
                  onChange={event => {
                    this.handleChange(event, ["age"], [2], false);
                  }}
                  aria-describedby="age-helper-text"
                  labelWidth={30}
                />
                <FormHelperText id="age-helper-text">
                  {" "}
                  &nbsp;{this.state.errorText.info.age}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="info-item">
              <FormControl variant="outlined" className="form-field">
                {/* <InputLabel htmlFor="filled-adornment-age">Gender</InputLabel> */}
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender1"
                  value={this.state.user.info.gender}
                  onChange={event => {
                    this.handleChange(event, ["gender"], [3], false);
                  }}
                >
                  <FormControlLabel
                    value={0}
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value={1}
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="info-item button">
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
export default BasicInfo;
