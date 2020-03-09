import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import './LoginPage.scss';
class LoginPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            showPassword: false,
            userNameErr: false,
            passwordErr: false,
            userNameErrText: "",
            passwordErrText: ""            
        }
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleClickShowPassword(){
        this.setState({showPassword: !this.state.showPassword });
    };
    
    handleMouseDownPassword(event){
        event.preventDefault();
    };
    handlePasswordChange(event){
        if (!event.target.value) {
            this.setState({passwordErr: true, passwordErrText: "Password is required."})
        } else if (event.target.value.length < 6) {
            this.setState({passwordErr: true, passwordErrText: "Password needs more than 6 characters."})
        } else {
            this.setState({passwordErr: false, passwordErrText: ""});
        }
        
        this.setState({password: event.target.value});
    }
    handleUsernameChange(event){
        if (!event.target.value) {
            this.setState({userNameErr: true, userNameErrText: "Username is required."})
        } else {
            this.setState({userNameErr: false, userNameErrText: ""});
        }
        this.setState({username: event.target.value});
    }
    handleLogin(event) {
        if (this.state.userNameErr || this.state.passwordErr) {
            return;
        }
        
    }
    render() {
      return (
        <div className="LoginPage">
            <div className = "LoginPageWrapper">
            <Grid container spacing={3} className = "LoginPageContainer">
                <Grid item xs={3}>       
                </Grid>
                <Grid item xs={6}>
                <Paper className = "paper">
                    <div className = "login-item-wrapper">
                        <div className = "login-item">
                            <FormControl variant="outlined" className = "form-field" error  = {this.state.userNameErr}>
                                <InputLabel htmlFor="filled-adornment-username">Username</InputLabel>
                                <OutlinedInput
                                
                                    id="filled-adornment-username"
                                    type={'text'}
                                    value={this.state.username}
                                    onChange={event => {this.handleUsernameChange(event)}}
                                    aria-describedby="username-helper-text"
                                    // endAdornment={
                                    // <InputAdornment position="end">
                                    // </InputAdornment>
                                    // }
                                    labelWidth={70}
                                />
                                <FormHelperText id="username-helper-text"> &nbsp;{this.state.userNameErrText}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className = "login-item">
                            <FormControl variant="outlined" className = "form-field" error  = {this.state.passwordErr}>
                            <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="filled-adornment-password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                value={this.state.password}
                                onChange={event => {this.handlePasswordChange(event)}}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={event => {this.handleClickShowPassword(event)}}
                                    onMouseDown={event => {this.handleMouseDownPassword(event)}}
                                    edge="end"
                                    >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                aria-describedby="pass-helper-text"
                                labelWidth={70}
                            />
                            <FormHelperText id="pass-helper-text">&nbsp;{this.state.passwordErrText}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className = "login-item">
                            <Button variant="contained" onClick = {event => {this.handleLogin(event)}} color="secondary">
                                Login
                            </Button>
                        </div>
                    </div>
                </Paper>
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
            </div>
        </div>
      );
    }
}
export default withRouter(LoginPage);