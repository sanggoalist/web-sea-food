import React from "react";
import { withRouter } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import "./LoginPage.scss";
import SpringModal from "../components/SpringModal";
import firebase from "../Firebase";
import InfoModal from "../components/InfoModal";
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      userNameErr: false,
      passwordErr: false,
      userNameErrText: "",
      passwordErrText: "",
      isLoading: false,
      loaded: false,
      infoText: ""
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }
  closeModal(event) {
    this.setState({ loaded: false, infoText: "" });
  }
  handlePasswordChange(event) {
    if (!event.target.value) {
      this.setState({
        passwordErr: true,
        passwordErrText: "Password is required."
      });
    } else if (event.target.value.length < 6) {
      this.setState({
        passwordErr: true,
        passwordErrText: "Password needs more than 6 characters."
      });
    } else {
      this.setState({ passwordErr: false, passwordErrText: "" });
    }

    this.setState({ password: event.target.value });
  }
  handleUsernameChange(event) {
    if (!event.target.value) {
      this.setState({
        userNameErr: true,
        userNameErrText: "Username is required."
      });
    } else {
      this.setState({ userNameErr: false, userNameErrText: "" });
    }
    this.setState({ username: event.target.value });
  }
  handleLogin(event) {
    if (this.state.username.length === 0 || this.state.password.length === 0) {
      return;
    }
    if (this.state.userNameErr || this.state.passwordErr) {
      return;
    }
    this.setState({ loaded: false, infoText: "" });
    this.setState({ isLoading: true });
    const checkRef = firebase.database().ref(`user_checks`);

    checkRef.on("value", snapshoot => {
      var checks = [];
      var userId = null;
      checks = snapshoot.val();
      var isHad = false;
      for (let index = 0; index < checks.length; index++) {
        const element = checks[index];
        if (
          element["username"] === this.state.username ||
          element["email"] === this.state.username
        ) {
          isHad = true;
          userId = element["id"];
        }
      }
      if (!isHad) {
        this.setState({ isLoading: false });
        this.setState({ loaded: true, infoText: "User is not valid." });
        return;
      }
      const authRef = firebase.database().ref(`auths/${userId}`);
      authRef.on("value", snapshoot => {
        this.setState({ isLoading: false });
        if (!snapshoot.val()) {
          this.setState({ loaded: true, infoText: "Server Error." });
          return;
        }
        var item = snapshoot.val();
        if (item["password"] + "" !== this.state.password) {
          this.setState({
            loaded: true,
            infoText: "Username or Password is incorrect."
          });
          return;
        } else {
          var user = {};
          user["username"] = item["username"];
          user["email"] = item["email"];
          user["userId"] = userId;
          const ref = firebase.database().ref(`users/${userId}`);
          ref.on("value", item => {
            console.log(item);
            user["img"] = item.val()["info"]["img"];
            localStorage.setItem("userItem", JSON.stringify(user));
            this.setState({ loaded: true, infoText: "Login Success!" });
            this.props.history.push("/home");
          });
        }
      });
    });
  }
  render() {
    return (
      <div className="LoginPage">
        <div className="LoginPageWrapper">
          <Grid container spacing={3} className="LoginPageContainer">
            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
              <Paper className="paper">
                <div className="login-item-wrapper">
                  <div className="login-item">
                    <Typography variant="h3" gutterBottom>
                      Login
                    </Typography>
                  </div>
                  <div className="login-item">
                    <FormControl
                      variant="outlined"
                      className="form-field"
                      error={this.state.userNameErr}
                    >
                      <InputLabel htmlFor="filled-adornment-username">
                        Username
                      </InputLabel>
                      <OutlinedInput
                        id="filled-adornment-username"
                        type={"text"}
                        value={this.state.username}
                        onChange={event => {
                          this.handleUsernameChange(event);
                        }}
                        aria-describedby="username-helper-text"
                        // endAdornment={
                        // <InputAdornment position="end">
                        // </InputAdornment>
                        // }
                        labelWidth={70}
                      />
                      <FormHelperText id="username-helper-text">
                        {" "}
                        &nbsp;{this.state.userNameErrText}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className="login-item">
                    <FormControl
                      variant="outlined"
                      className="form-field"
                      error={this.state.passwordErr}
                    >
                      <InputLabel htmlFor="filled-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="filled-adornment-password"
                        type={this.state.showPassword ? "text" : "password"}
                        value={this.state.password}
                        onChange={event => {
                          this.handlePasswordChange(event);
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
                        &nbsp;{this.state.passwordErrText}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className="login-item">
                    <div>
                      New here ? Don't worry!{" "}
                      <a href="/user/register">Go to here</a> for new account
                      registration
                    </div>
                  </div>
                  <div className="login-item">
                    <Button
                      variant="contained"
                      onClick={event => {
                        this.handleLogin(event);
                      }}
                      color="secondary"
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </div>
        {this.state.loaded ? (
          <InfoModal
            closeFunc={event => {
              this.closeModal();
            }}
            load={this.state.loaded}
            text={this.state.infoText}
          />
        ) : (
          ""
        )}
        {/* {(this.state.failed) ?<InfoModal load = {this.state.failed} text = "ERROR"/> : ""} */}
        {this.state.isLoading ? (
          <SpringModal load={this.state.isLoading} />
        ) : (
          ""
        )}
      </div>
    );
  }
}
export default withRouter(LoginPage);
