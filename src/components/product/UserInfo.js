import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import PhoneIcon from '@material-ui/icons/Phone';
import firebase from "../../Firebase";

class UserInfo extends React.Component {
    
  constructor(props){
    super(props);
    this.generate = this.generate.bind(this);
    this.state = {
        dense: false,
        secondary: true,
        user: {
            email: "",
            id: 0,
            age: 0,
            name: "",
            gender: 0,
            img: "",
            username: "",
            mobile_phone: "",
            phone: "",
            address: ""
          },
    }
  }

  generate(element) {
    return [0].map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }
  componentDidMount() {
    const ref = firebase.database().ref(`public_info/${this.props.userId}`);
    ref.on("value", res => {
      this.setState({ user: res.val() });
    });
  }
    render() {
      return (
        <div className="UserInfo">
            <List dense={this.state.dense}>
              {this.generate(
                <ListItem>
                  <ListItemAvatar>
                    <Avatar src = {this.state.user.img}>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary= {this.state.user.name}
                    secondary={this.state.secondary ?this.state.user.email : null}
                  />
                  <ListItemSecondaryAction>
                  {this.state.user.phone}
                    <IconButton edge="end" aria-label="delete">
                      <PhoneIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>,
              )}
            </List>
        </div>
      );
    }
}
export default UserInfo;