import React from "react";
import "./DisplayInfo.scss";
import { CircularProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import firebase from "../../Firebase";
import SpringModal from "../SpringModal";

class DisplayInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      loading: false,
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
    this.uploadImage = this.uploadImage.bind(this);
  }
  componentDidMount() {
    const ref = firebase.database().ref(`users/${this.props.userId}`);
    ref.on("value", res => {
      this.setState({ user: res.val(), loaded: true });
    });
  }
  uploadImage(event) {
    if (event.target.files[0]) {
      this.setState({ loading: true });
      firebase
        .storage()
        .ref(`/images/${this.props.userId}`)
        .put(event.target.files[0], { contentEncoding: "" })
        .then(res => {
          firebase
            .storage()
            .ref(`/images/${this.props.userId}`)
            .getDownloadURL()
            .then(res => {
              const ref = firebase.database().ref(`users/${this.props.userId}`);
              var item = this.state.user;
              item.info.img = res;
              const publicRef = firebase
                .database()
                .ref(`public_info/${this.props.userId}/img`);
              Promise.all([ref.update(item), publicRef.set(res)]).then(snap => {
                var user = JSON.parse(localStorage.getItem("userItem"));
                user["img"] = res;
                localStorage.setItem("userItem", JSON.stringify(user));
                this.setState({ item: item, loading: false });
              });
            });
        });
    }
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
            <label htmlFor="icon-button-file-dis">
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
        {this.state.loading ? <SpringModal load={this.state.loading} /> : ""}
      </div>
    );
  }
}
export default DisplayInfo;
