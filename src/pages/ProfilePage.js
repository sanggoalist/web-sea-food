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

class ProfilePage extends React.Component {
    
    constructor(props){
      super(props);
      this.state = {
        item: {
            id: 0,
            info: {
              age: 0,
              fullname: "",
              gender: 0
            },
            username: "",
            email: ""
        }
      }
    }

    componentDidMount(){
      const ref = firebase.database().ref(`users/${111111}`);
      ref.on('value', (snapshoot) => {
          this.setState({item: snapshoot.val()});
      });
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
                                    <Avatar className = "profile-avatar" alt="User Avatar" src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/88237695_101891478093897_6089096468365312000_n.jpg?_nc_cat=1&_nc_sid=85a577&_nc_ohc=k32RWUwcqMkAX-urzo_&_nc_ht=scontent.fsgn2-2.fna&oh=6d7a5a02c2570e081c26ae6944b4d85d&oe=5E96A48F"></Avatar>
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
                                        className = "email-text"
                                        id="filled-error-helper-text"
                                        label="Email"
                                        variant="outlined"
                                      />}
                                      label="Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
                                      labelPlacement="start"
                                    />
                                </FormControl>

                                <FormControl component="fieldset" className = "form-ctl">
                                  <FormControlLabel
                                      className ="form-control-label"
                                      value= {this.state.item.username}
                                      control={<TextField
                                        className = "email-text"
                                        id="filled-error-helper-text"
                                        label="Username"
                                        variant="outlined"
                                      />}
                                      label="Username"
                                      labelPlacement="start"
                                    />
                                </FormControl>  
                                <FormControl component="fieldset" className = "form-ctl">
                                  <FormControlLabel
                                      className ="form-control-label"
                                      value= {this.state.item.info.fullname}
                                      control={<TextField
                                        className = "email-text"
                                        id="filled-error-helper-text"
                                        label="FullName"
                                        variant="outlined"
                                      />}
                                      label="FullName&nbsp;"
                                      labelPlacement="start"
                                    />
                                </FormControl>                          
                              </div>
                            </Paper>
                          </Grid>
                        </Grid>
                        </Paper>
                    </Grid>                       
            </Grid>
        </div>
      );
    }
}
export default withRouter(ProfilePage);