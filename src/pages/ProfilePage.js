import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import './ProfilePage.scss';
import TextField from '@material-ui/core/TextField';
import firebase from '../Firebase';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InfoModal from '../components/InfoModal';
import SpringModal from '../components/SpringModal';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

class ProfilePage extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {
        item: {
            id: 0,
            info: {
              age: 0,
              fullname: "",
              gender: 0,
              img: ""
            },
            username: "",
            email: ""
        },
        auth: {
          password: ""
        },
        showPassword: false,
        passErr: false,
        usernameErr: false,
        emailErr: false,
        fullnameErr: false,
        passErrText: "",
        usernameErrText: "",
        emailErrText: "",
        fullnameErrText: "",
        saved: false,
        failed: false,
        loading: false,
        file: null
      }
      this.handleFullname = this.handleFullname.bind(this);
      this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
      this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
      this.handleEmail = this.handleEmail.bind(this);
      this.handleUserName = this.handleUserName.bind(this);
      this.handlePassword = this.handlePassword.bind(this);
      this.handleSave = this.handleSave.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.uploadImage = this.uploadImage.bind(this);
    }

    componentDidMount(){
      const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
      const ref = firebase.database().ref(`users/${userId}`);
      ref.on('value', (snapshoot) => {
          this.setState({item: snapshoot.val()});
      });
      const authRef = firebase.database().ref(`auths/${userId}`);
      authRef.on('value', (snapshoot) => {
        this.setState({auth: snapshoot.val()});
    });
  }
  handleClickShowPassword(event){
    this.setState({showPassword: !this.state.showPassword});
  };

  handleMouseDownPassword(event){
    event.preventDefault();
  };
  handleFullname(event){
    const item = this.state.item;
    item.info.fullname = event.target.value;
    this.setState({fullnameErr: false, fullnameErrText: ""});
    if (item.info.fullname.length === 0){
      this.setState({fullnameErr: true, fullnameErrText: "Fullname is required."});
      return;      
    }
    if (item.info.fullname.length > 50){
      return;
    }
    this.setState({item: item});
  }
  handleEmail(event){
    const item = this.state.item;
    item.email = event.target.value;
    this.setState({emailErr: false, emailErrText: ""});
    if (item.email.length === 0){
      this.setState({emailErr: true, emailErrText: "Email is required."});
      return;      
    }
    if (item.email.length > 50){
      return;
    }
    this.setState({item: item});
  }
  handleUserName(event){
    const item = this.state.item;
    item.username = event.target.value;
    this.setState({usernameErr: false, usernameErrText: ""});
    if (item.username.length === 0){
      this.setState({usernameErr: true, usernameErrText: "Username is required."});
      return;      
    }
    if (item.username.length > 15){
      return;
    }
    this.setState({item: item});
  }
  closeModal(event){
    this.setState({saved: false, failed: false});
  }
  handlePassword(event){
    const item = this.state.auth;
    item.password = event.target.value;
    this.setState({passErr: false, passErrText: ""});
    if (item.password.length === 0){
      this.setState({passErr: true, passErrText: "Password is required."});
      return;
    } else if (item.password.length < 6){
      this.setState({passErr: true, passErrText: "Password needs to contain 6 characters or more."});
      return;      
    }  
    if (item.password.length > 15){
      return;
    }
    this.setState({auth: item});
  }
  handleSave(event) {
    if (this.state.passErr || this.state.usernameErr || this.state.fullnameErr || this.state.emailErr) {
        return;
    }
    const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
    
    this.setState({loading: true});
    const ref = firebase.database().ref(`users/${userId}`);
    const checkRef = firebase.database().ref(`user_checks`);
    checkRef.on('value', res => {
        var checks = [];
        checks = res.val();
        var ind = 0;
        for (let index = 0; index < checks.length; index++) {
          const element = checks[index];
          if (element["id"] === userId){
            ind = index;
            break;
          }
        }
        const authRef = firebase.database().ref(`auths/${userId}`);
        Promise.all([firebase.database().ref(`user_checks/${ind}`).update({
          email: this.state.item.email,
          username: this.state.item.username,
          id: userId
        }), ref.update(this.state.item), authRef.update({
          email: this.state.item.email,
          username: this.state.item.username,
          password: this.state.auth.password      
        })]).then(res => {

          var user = {};
          this.setState({loading: false});
          this.setState({saved: true});

          user["username"] = this.state.item.username;
          user["email"] = this.state.item.email;
          user["userId"] = userId;
          localStorage.setItem("userItem", JSON.stringify(user));
            
        }).catch(err => {
          
            this.setState({loading: false});
            this.setState({failed: true});
        });
    });
    // ref.update(this.state.item).then(res => {
    //     this.setState({loading: false});
    //     this.setState({saved: true});
        
    // }).catch(err => {
    //     this.setState({loading: false});
    //     this.setState({failed: true});
    // });


  }
  uploadImage(event){
    if (event.target.files[0]){
      this.setState({loading: true});
      const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
      firebase.storage().ref(`/images/${userId}`).put(event.target.files[0], {contentEncoding: ''}).then(res => {
        const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
        firebase.storage().ref(`/images/${userId}`).getDownloadURL().then(res => {
            const ref = firebase.database().ref(`users/${userId}`);
            var item = this.state.item;
            item.info.img = res;
            ref.update(item).then(snap => {
                var user = JSON.parse(localStorage.getItem("userItem"));
                user["img"] = res;
                localStorage.setItem("userItem", JSON.stringify(user));
                this.setState({item: item, loading: false});
            });
      });
    });    
  }
}
    render() {
      return (
        <div className="Profile">
            <Grid container spacing={0} className = "ProfilePageContainer">
                    <Grid item xs={12} className ="grid-container">
                        <Paper  className = "paper" >
                        <Grid container spacing={3} className = "ChildContainer">
                          <Grid item xs={3} className ="left-grid-container">
                            <Paper  className = "left-paper" >
                                <div className ="avatar-container">
                                    <Avatar className = "profile-avatar" alt="User Avatar" src={this.state.item.info.img}>
                                    </Avatar>
                                    <input accept="image/*" id="icon-button-file" type="file" onChange = {event => {this.uploadImage(event)}} />
                                      <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                          <PhotoCamera />
                                        </IconButton>
                                      </label>
                                </div>
                                <div>{this.state.item.info.fullname}</div>
                                <div>Age: {this.state.item.info.age}</div>
                                <div>Gender: {(this.state.item.info.gender === 1) ?'Male': 'Female'}</div>
                            </Paper>
                          </Grid>
                          <Grid item xs={9} className ="right-grid-container">
                            <Paper  className = "right-paper">
                              <div className ="right-container">

                                <FormControl component="fieldset" className = "form-ctl">
                                  <FormControlLabel
                                      className ="form-control-label"
                                      value= {this.state.item.email}
                                      control={<TextField
                                      error = {this.state.emailErr}
                                        className = "email-text"
                                        label="Email"
                                        variant="outlined"
                                        onChange = {event => {this.handleEmail(event)}}
                                      />}
                                      label="Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                                      labelPlacement="start"
                                    />
                                    <div className ="form-error">{this.state.emailErrText}</div>
                                </FormControl>

                                <FormControl component="fieldset" className = "form-ctl">
                                  <FormControlLabel
                                      className ="form-control-label"
                                      value= {this.state.item.username}
                                      control={<TextField
                                        className = "email-text"
                                        label="Username"
                                        variant="outlined"
                                        error = {this.state.usernameErr}
                                        onChange = {event => {this.handleUserName(event)}}
                                      />}
                                      label="Username"
                                      labelPlacement="start"
                                    />
                                    <div className ="form-error">{this.state.usernameErrText}</div>
                                </FormControl>  
                                <FormControl component="fieldset" className = "form-ctl">
                                  <FormControlLabel
                                      className ="form-control-label"
                                      value= {this.state.item.info.fullname}
                                      control={<TextField
                                        className = "email-text"
                                        label="FullName"
                                        variant="outlined"
                                        error = {this.state.fullnameErr}
                                        onChange = {event => {this.handleFullname(event)}}
                                      />}
                                      label="FullName&nbsp;"
                                      labelPlacement="start"
                                    />
                                    <div className ="form-error">{this.state.fullnameErrText}</div>
                                </FormControl>
                                <FormControl component="fieldset" className = "form-ctl">
                                <FormControlLabel
                                      className ="form-control-label"
                                      value= {this.state.item.info.fullname}
                                      control={<OutlinedInput
                                        id="outlined-adornment-password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.auth.password}
                                        className = "email-text"
                                        onChange = {event => {this.handlePassword(event)}}
                                        error = {this.state.passErr}
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
                                      />}
                                      label="Password"
                                      labelPlacement="start"
                                    />
                                    <div className ="form-error">{this.state.passErrText}</div>                               
                                </FormControl>
                                <div className = "btn-container">
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className='button-save'
                                    startIcon={<SaveIcon />}
                                    onClick = {event => {this.handleSave(event)}}
                                  >
                                    Save
                                  </Button>
                                </div>                          
                              </div>
                            </Paper>
                          </Grid>
                        </Grid>
                        </Paper>
                    </Grid>                       
            </Grid>
            {(this.state.saved) ?<InfoModal closeFunc ={event => {this.closeModal()}} load = {this.state.saved} text ="SUCCESS"/> : ""}
            {(this.state.failed) ?<InfoModal closeFunc ={event => {this.closeModal()}} load = {this.state.failed} text = "ERROR"/> : ""}
            {(this.state.loading) ?<SpringModal load = {this.state.loading}/> : ""}
        </div>
      );
    }
}
export default withRouter(ProfilePage);