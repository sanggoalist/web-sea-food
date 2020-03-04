import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import './ProfilePage.scss';

class ProfilePage extends React.Component {
    
    constructor(props){
      super(props);
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
                            </Paper>
                          </Grid>
                          <Grid item xs={9} className ="right-grid-container">
                            <Paper  className = "right-paper" >
                                RIGHT
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