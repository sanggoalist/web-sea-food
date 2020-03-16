import React from "react";
import "./DisplayInfo.scss";
import { CircularProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import firebase from "../../Firebase";

class DisplayInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
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
      }
    };
  }
  componentDidMount() {
    const ref = firebase.database().ref(`users/${this.props.userId}`);
    ref.on("value", res => {
      this.setState({ user: res.val(), loaded: true });
    });
  }
  render() {
    return (
      <div className="DisplayInfo">
        {!this.state.loaded ? (
          <CircularProgress />
        ) : (
          <div className="DisplayInfoWrapper">
            <Avatar
              className="profile-avatar"
              alt="User Avatar"
              src={this.state.user.info.img}
            ></Avatar>
            <input
              accept="image/*"
              id="icon-button-file-dis"
              type="file"
              onChange={event => {
                this.uploadImage(event);
              }}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <div className="display-item">
              Name: {this.state.user.info.fullname}
            </div>
            <div className="display-item">Age: {this.state.user.info.age}</div>
            <div className="display-item">
              Gender: {this.state.user.info.gender === 1 ? "Male" : "Female"}
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default DisplayInfo;
