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
import moment from 'moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class RegisterPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            fullname: "",
            age: "",
            address: "",
            phone: "",
            mobile_phone: "",
            addressErr: false,
            phoneErr: false,
            mobilePhoneErr: false,
            addressErrText: "",
            phoneErrText: "",
            mobilePhoneErrText: "",            
            gender: 0,
            ageErr: false,
            ageErrText: "",
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
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleMobilePhoneChange = this.handleMobilePhoneChange.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.checkBeforeRegister = this.checkBeforeRegister.bind(this);
    }
    handleClickShowPassword(){
        this.setState({showPassword: !this.state.showPassword });
    };
    
    handleMouseDownPassword(event){
        event.preventDefault();
    };
    closeModal(event){
        this.setState({loaded: false, infoText: ""});
    }
    handleUsernameChange(event, isClick) {
        if (!isClick)
        this.setState({userNameErr: false, userNameErrText: ''});
        const value = (!isClick)?event.target.value: this.state.username;
        if (!value){
            this.setState({userNameErr: true, userNameErrText: 'Username is required.'});
        } else {
            if (value.length < 4){
                this.setState({userNameErr: true, userNameErrText: 'Username is too short.'});
            } else if (value.length > 30) {
                this.setState({userNameErr: true, userNameErrText: 'Username is less than 30 characters.'});
            } 
        }
        if (!isClick)
        this.setState({username: value});
    }
    handleEmailChange(event, isClick) {
        if (!isClick)
        this.setState({emailErr: false, emailErrText: ''});
        const value = (!isClick)?event.target.value: this.state.email;
        if (!value){
            this.setState({emailErr: true, emailErrText: 'Email is required.'});
        } else {
            if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(value)){
                this.setState({emailErr: true, emailErrText: 'Email is incorrect!'});
            }
        }
        if (!isClick)
        this.setState({email: value});
    }
    handleFullNameChange(event, isClick) {
        if (!isClick)
        this.setState({fullnameErr: false, fullnameErrText: ''});
        const value = (!isClick)?event.target.value: this.state.fullname;
        if (!value){
            this.setState({fullnameErr: true, fullnameErrText: 'Full name is required.'});
        } else {
             if (value.length > 100) {
                this.setState({fullnameErr: true, fullnameErrText: 'Full name is less than 100 characters.'});
            } 
        }
        if (!isClick)
        this.setState({fullname: value});
    }
    handlePasswordChange(event, isClick){
        if (!isClick)
        this.setState({passwordErr: false, passwordErrText: ''});
        const value = (!isClick)?event.target.value: this.state.password;
        if (!value){
            this.setState({passwordErr: true, passwordErrText: 'Password is required.'});
        } else {
            if (value.length < 6){
                this.setState({passwordErr: true, passwordErrText: 'Password is too short.'});
            } else if (value.length > 20) {
                this.setState({passwordErr: true, passwordErrText: 'Password is less than 20 characters.'});
            } 
        }
        if (!isClick)
        this.setState({password: value});
    }
    handleAgeChange(event, isClick){
        if (!isClick)
        this.setState({ageErr: false, ageErrText: ""});
        const value = (!isClick)?event.target.value: this.state.age;
        if (value.length > 0){
            if (Number.isNaN(+value)){
                this.setState({ageErr: true, ageErrText: "Age should be number format"});
    
            } else {
                if (Number.parseInt(value) < 0){
                    this.setState({ageErr: true, ageErrText: "Age should be positive number"});
                }
            }
        }
        if (value.length > 5){
            return;
        }
        if (!isClick)
        this.setState({age: value});
    }
    handleAddressChange(event, isClick) {
        if (!isClick)
        this.setState({addressErr: false, addressErrText: ''});
        const value = (!isClick)?event.target.value: this.state.address;
        if (!value){
            this.setState({addressErr: true, addressErrText: 'Address is required.'});
        } else {
             if (value.length > 500) {
                this.setState({addressErr: true, addressErrText: 'Address is less than 500 characters.'});
            } 
        }
        if (!isClick)
        this.setState({address: value});
    }
    handlePhoneChange(event, isClick) {
        if (!isClick)
        this.setState({phoneErr: false, phoneErrText: ''});
        const value = (!isClick)?event.target.value: this.state.phone;
        if (!value){
            this.setState({phoneErr: true, phoneErrText: 'Phone number is required.'});
        } else {
            if (!new RegExp(/^[0-9]*$/).test(value)){
                this.setState({phoneErr: true, phoneErrText: 'Phone number is incorrect!'});
            }
             if (value.length > 15) {
                return;
            } 
        }
        if (!isClick)
        this.setState({phone: value});
    }
    handleMobilePhoneChange(event, isClick) {
        if (!isClick)
        this.setState({mobilePhoneErr: false, mobilePhoneErrText: ''});
        const value = (!isClick)?event.target.value: this.state.mobile_phone;
        if (!value){
            this.setState({mobilePhoneErr: true, mobilePhoneErrText: 'Mobile Phone Number is required.'});
        } else {
            if (!new RegExp(/^[0-9]*$/).test(value)){
                this.setState({mobilePhoneErr: true, mobilePhoneErrText: 'Mobile Phone Number is incorrect!'});
            }
             if (value.length > 15) {
                return;
            } 
        }
        if (!isClick)
        this.setState({mobile_phone: value});
    }
    handleGenderChange(event){
        this.setState({gender: +event.target.value})
    } 
    checkBeforeRegister(event) {
        this.handleUsernameChange(event, true);
        this.handleEmailChange(event, true);
        this.handleFullNameChange(event, true);
        this.handlePasswordChange(event, true);
        this.handleAgeChange(event, true);
        this.handleAddressChange(event, true);
        this.handlePhoneChange(event, true);
        this.handleMobilePhoneChange(event, true);
        this.setState({isLoading: true});
        setTimeout(() => {
            this.handleRegister(event);
        }, 1000);
    }
    handleRegister(event) {


        if ((this.state.userNameErr || this.state.emailErr || this.state.fullnameErr || 
            this.state.passwordErr || this.state.ageErr || this.state.addressErr || this.state.phoneErr
            || this.state.mobilePhoneErr)) {
                console.log("Error")
            return;
        }
        
        const checkRef = firebase.database().ref('user_checks');
        checkRef.once('value', res => {
            var l = res.val().length;
            var isNot = false;
            res.val().forEach(element => {
                if (element["username"] === this.state.username || element["email"] === this.state.email){
                    isNot = true;
                    return;
                }
            });
            if (isNot){
                this.setState({isLoading: false, loaded: true, infoText: "Username or Email is already existed!"});
                return;
            } else {
                const userId = moment().unix();
                var userItem = {
                    username: this.state.username,
                    email: this.state.email,
                    id: userId,
                    info: {
                        age: this.state.age,
                        fullname: this.state.fullname,
                        img: "",
                        gender: this.state.gender,
                        address: this.state.address,
                        phone: this.state.phone,
                        mobile_phone: this.state.mobile_phone
                    }
                }
                var authItem = {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password                
                }
                var checkItem = {
                    username: this.state.username,
                    email: this.state.email,
                    id: userId               
                }
                var publicInfo = {
                    age: this.state.age,
                    name: this.state.fullname,
                    img: "",
                    gender: this.state.gender,
                    address: this.state.address,
                    phone: this.state.phone,
                    mobile_phone: this.state.mobile_phone,
                    username: this.state.username                   
                }       
                const userRef = firebase.database().ref('users');
                const authRef = firebase.database().ref('auths');
                const publicRef = firebase.database().ref(`public_info/${userId}`);
                userRef.child(userId).set(userItem);
                Promise.all([userRef.child(userId).set(userItem), authRef.child(userId).set(authItem)
                    , checkRef.child(l).set(checkItem),
                     publicRef.set(publicInfo)]).then(res => {
                    this.setState({isLoading: false, loaded: true, infoText: "Registration is success!"});
                    this.props.history.push("/login");
                }).catch(err => {
                    this.setState({isLoading: false, loaded: true, infoText: "Failed! Server Error!"});
                });
            }
        })
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
                                        onChange={event => {this.handleUsernameChange(event, false)}}
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
                                        onChange={event => {this.handleEmailChange(event, false)}}
                                        aria-describedby="email-helper-text"
                                        labelWidth={50}
                                    />
                                    <FormHelperText id="email-helper-text"> &nbsp;{this.state.emailErrText}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "register-item">
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.passwordErr}>
                                <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                <OutlinedInput
                                    id="filled-adornment-password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={event => {this.handlePasswordChange(event, false)}}
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
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.fullnameErr}>
                                    <InputLabel htmlFor="filled-adornment-fullname">Full Name</InputLabel>
                                    <OutlinedInput
                                    
                                        id="filled-adornment-fullname"
                                        type={'text'}
                                        value={this.state.fullname}
                                        onChange={event => {this.handleFullNameChange(event, false)}}
                                        aria-describedby="fullname-helper-text"
                                        labelWidth={70}
                                    />
                                    <FormHelperText id="fullname-helper-text"> &nbsp;{this.state.fullnameErrText}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "register-item">
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.ageErr}>
                                    <InputLabel htmlFor="filled-adornment-age">Age</InputLabel>
                                    <OutlinedInput
                                    
                                        id="filled-adornment-age"
                                        type={'text'}
                                        value={this.state.age}
                                        onChange={event => {this.handleAgeChange(event, false)}}
                                        aria-describedby="age-helper-text"
                                        labelWidth={70}
                                    />
                                    <FormHelperText id="age-helper-text"> &nbsp;{this.state.ageErrText}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "register-item">
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.addressErr}>
                                    <InputLabel htmlFor="filled-adornment-address">Address</InputLabel>
                                    <OutlinedInput
                                        id="filled-adornment-address"
                                        type={'text'}
                                        value={this.state.address}
                                        onChange={event => {this.handleAddressChange(event, false)}}
                                        aria-describedby="address-helper-text"
                                        labelWidth={50}
                                    />
                                    <FormHelperText id="address-helper-text"> &nbsp;{this.state.addressErrText}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "register-item">
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.phoneErr}>
                                    <InputLabel htmlFor="filled-adornment-phone">Phone</InputLabel>
                                    <OutlinedInput
                                        id="filled-adornment-phone"
                                        type={'text'}
                                        value={this.state.phone}
                                        onChange={event => {this.handlePhoneChange(event, false)}}
                                        aria-describedby="phone-helper-text"
                                        labelWidth={50}
                                    />
                                    <FormHelperText id="phone-helper-text"> &nbsp;{this.state.phoneErrText}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "register-item">
                                <FormControl variant="outlined" className = "form-field" error  = {this.state.mobilePhoneErr}>
                                    <InputLabel htmlFor="filled-adornment-phone-m">Mobile Phone</InputLabel>
                                    <OutlinedInput
                                        id="filled-adornment-phone-m"
                                        type={'text'}
                                        value={this.state.mobile_phone}
                                        onChange={event => {this.handleMobilePhoneChange(event, false)}}
                                        aria-describedby="m-phone-helper-text"
                                        labelWidth={100}
                                    />
                                    <FormHelperText id="m-phone-helper-text"> &nbsp;{this.state.mobilePhoneErrText}</FormHelperText>
                                </FormControl>
                            </div>
                            <div className = "register-item">
                                <FormControl variant="outlined" className = "form-field">
                                    {/* <InputLabel htmlFor="filled-adornment-age">Gender</InputLabel> */}
                                    <FormLabel component="legend">Gender</FormLabel>
                                    <RadioGroup aria-label="gender" name="gender1" value={this.state.gender} onChange = {event => {this.handleGenderChange(event)}}>
                                        <FormControlLabel value= {0} control={<Radio />} label="Female" />
                                        <FormControlLabel value={1} control={<Radio />} label="Male" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <div className = "register-item">
                                <Button variant="contained" onClick = {event => {this.checkBeforeRegister(event)}} color="secondary">
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
            {(this.state.loaded) ?<InfoModal closeFunc ={event => {this.closeModal()}} load = {this.state.loaded} text ={this.state.infoText}/> : ""}
            {/* {(this.state.failed) ?<InfoModal load = {this.state.failed} text = "ERROR"/> : ""} */}
            {(this.state.isLoading) ? <SpringModal load = {this.state.isLoading}/>: '' }
        </div>
      );
    }
}
export default withRouter(RegisterPage);