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
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SpringModal from '../components/SpringModal';
import firebase from '../Firebase';
import InfoModal from '../components/InfoModal';
import './RegisterPage.scss';
class RegisterPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            fullname: "",
            fullnameErr: false,
            fullnameErrText: "",
            emailErr: false,
            emailErrText: "",            
            showPassword: false,
            userNameErr: false,
            passwordErr: false,
            userNameErrText: "",
            passwordErrText: "",
            isLoading: false,
            loaded: false,
            infoText: ""            
        }
    }
    render() {
      return (
        <div className="RegisterPage">
            <div className = "RegisterPageWrapper">
                <Grid container spacing={3} className = "RegisterPageContainer">
                    <Grid item xs={3}>       
                    </Grid>
                    <Grid item xs={6}>
                    <Paper className = "paper">
                        <div className = "register-item-wrapper">
                            <div className = "register-item">
                            <Typography variant="h3" gutterBottom>
                                Register New Account
                            </Typography>                            
                            </div>
                            <div className = "register-item">
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
                            <div className = "register-item">
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.emailErr}>
                                    <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
                                    <OutlinedInput
                                    
                                        id="filled-adornment-email"
                                        type={'text'}
                                        value={this.state.email}
                                        onChange={event => {this.handleUsernameChange(event)}}
                                        aria-describedby="email-helper-text"
                                        labelWidth={50}
                                    />
                                    <FormHelperText id="email-helper-text"> &nbsp;{this.state.emailErrText}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "register-item">
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.fullnameErr}>
                                    <InputLabel htmlFor="filled-adornment-fullname">Full Name</InputLabel>
                                    <OutlinedInput
                                    
                                        id="filled-adornment-fullname"
                                        type={'text'}
                                        value={this.state.fullname}
                                        onChange={event => {this.handleUsernameChange(event)}}
                                        aria-describedby="fullname-helper-text"
                                        labelWidth={50}
                                    />
                                    <FormHelperText id="fullname-helper-text"> &nbsp;{this.state.fullnameErrText}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "register-item">
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
                            <div className = "register-item">
                                <Button variant="contained" onClick = {event => {this.handleLogin(event)}} color="secondary">
                                    Register
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
export default withRouter(RegisterPage);