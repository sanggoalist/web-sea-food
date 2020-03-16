import React from "react";
import "./AccountInfo.scss";
import { CircularProgress } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import firebase from "../../Firebase";
import SpringModal from "../SpringModal";
import InfoModal from "../InfoModal";

class AccountInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      saveLoading: false,
      infoLoading: false,
      infoText: "",
      showPassword: false,
      ind: null,
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
      item: {
        email: "",
        username: "",
        password: ""
      },
      error: {
        email: false,
        username: false,
        password: false
      },
      errorText: {
        email: "",
        username: "",
        password: ""
      }
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }
  handleSave(event) {
    this.handleChange(
      event,
      ["username", "email", "password"],
      [1, 2, 3],
      true
    );
    if (
      this.state.error.email ||
      this.state.error.username ||
      this.state.error.password
    ) {
      return;
    }
    this.setState({ saveLoading: true });
    var item = this.state.user;
    item.username = this.state.item.username;
    item.email = this.state.item.email;
    var auth = this.state.item;
    const ref = firebase.database().ref(`users/${this.props.userId}`);
    const authRef = firebase.database().ref(`auths/${this.props.userId}`);
    const checkRef = firebase.database().ref(`user_checks/${this.state.ind}`);
    Promise.all([
      ref.update(item),
      authRef.update(auth),
      checkRef.update({
        email: this.state.item.email,
        username: this.state.item.username,
        id: this.props.userId
      })
    ])
      .then(res => {
        var userItem = JSON.parse(localStorage.getItem("userItem"));
        userItem["username"] = this.state.item.username;
        userItem["email"] = this.state.item.email;
        localStorage.setItem("userItem", JSON.stringify(userItem));
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
  componentDidMount() {
    const ref = firebase.database().ref(`users/${this.props.userId}`);
    ref.on("value", res => {
      this.setState({ user: res.val() });
    });

    var item = this.state.item;
    const authRef = firebase.database().ref(`auths/${this.props.userId}`);
    authRef.on("value", res => {
      var auth = res.val();
      item.username = auth["username"];
      item.email = auth["email"];
      item.password = auth["password"];
      const checks = firebase.database().ref("user_checks");
      checks.on("value", res => {
        var chks = res.val();
        for (let index = 0; index < chks.length; index++) {
          const element = chks[index];
          if (+element["id"] === this.props.userId) {
            this.setState({ ind: index });
            break;
          }
        }
      });
      this.setState({ item: item, loaded: true });
    });
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
        errText[`${element}`] = `${i[0].toUpperCase() +
          i.slice(1)} is required.`;
        this.setState({ error: err, errorText: errText });
      }
      //Username
      if (type === 1 && value.length > 30) {
        return;
      }
      if (type === 1 && value.length < 4) {
        err[`${element}`] = true;
        errText[`${element}`] = "Username is too short.";
        this.setState({ error: err, errorText: errText });
      }
      //Username

      //Email
      if (type === 2 && value.length > 50) {
        return;
      }
      if (
        type === 2 &&
        value &&
        !new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(value)
      ) {
        err[`${element}`] = true;
        errText[`${element}`] = "Email is incorrect.";
        this.setState({ error: err, errorText: errText });
      }
      //Email

      //Password
      if (type === 3 && value.length > 20) {
        return;
      }
      if (type === 3 && value.length < 6) {
        err[`${element}`] = true;
        errText[`${element}`] = "Password is too short.";
        this.setState({ error: err, errorText: errText });
      }
      //Password

      if (!isClick) {
        item[`${element}`] = value;
        this.setState({ item: item });
      }
    }
  }
  render() {
    return (
      <div className="AccountInfo">
        {!this.state.loaded ? (
          <CircularProgress />
        ) : (
          <div className="AccountInfoWrrapper">
            <div className="account-item">
              <FormControl
                variant="outlined"
                className="form-field"
                error={this.state.error.username}
              >
                <InputLabel htmlFor="filled-adornment-username">
                  Username
                </InputLabel>
                <OutlinedInput
                  id="filled-adornment-username"
                  type={"text"}
                  value={this.state.item.username}
                  onChange={event => {
                    this.handleChange(event, ["username"], [1], false);
                  }}
                  aria-describedby="username-helper-text"
                  labelWidth={70}
                />
                <FormHelperText id="username-helper-text">
                  {" "}
                  &nbsp;{this.state.errorText.username}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="account-item">
              <FormControl
                variant="outlined"
                className="form-field"
                error={this.state.error.email}
              >
                <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
                <OutlinedInput
                  id="filled-adornment-email"
                  type={"text"}
                  value={this.state.item.email}
                  onChange={event => {
                    this.handleChange(event, ["email"], [2], false);
                  }}
                  aria-describedby="email-helper-text"
                  labelWidth={70}
                />
                <FormHelperText id="email-helper-text">
                  {" "}
                  &nbsp;{this.state.errorText.email}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="account-item">
              <FormControl
                variant="outlined"
                className="form-field"
                error={this.state.error.password}
              >
                <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="filled-adornment-password"
                  type={this.state.showPassword ? "text" : "password"}
                  value={this.state.item.password}
                  onChange={event => {
                    this.handleChange(event, ["password"], [3], false);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={event => {
                          this.handleClickShowPassword(event);
                        }}
                        onMouseDown={event => {
                          this.handleMouseDownPassword(event);
                        }}
                        edge="end"
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  aria-describedby="pass-helper-text"
                  labelWidth={70}
                />
                <FormHelperText id="pass-helper-text">
                  &nbsp;{this.state.errorText.password}
                </FormHelperText>
              </FormControl>
            </div>
            <div className="account-item button">
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
export default AccountInfo;
