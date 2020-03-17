import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { withRouter } from "react-router-dom";
import ListSubheader from "@material-ui/core/ListSubheader";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import "./Drawser.scss";
const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

function Drawser(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
    open: false
  });
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  const handleClose = event => {
    setState({ left: false });
    props.changeOpen(false);
  };
  const handleClick = type => event => {
    setState({ left: false });
    props.changeOpen(false);
    props.history.push("/home");
  };
  const handleProfile = type => event => {
    setState({ left: false });
    props.changeOpen(false);
    props.history.push("/user/profile");
  };
  const handleLogout = type => event => {
    setState({ left: false });
    props.changeOpen(false);
    localStorage.clear();
    props.history.push("/home");
  };
  const handleRegister = type => event => {
    setState({ left: false });
    props.changeOpen(false);
    props.history.push("/user/register");
  };
  const handleLogin = type => event => {
    setState({ left: false });
    props.changeOpen(false);
    props.history.push("/login");
  };

  const handleClickCat = () => {
    setOpen(!open);
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {/* {['Home', 'Categories', 'About Us', 'Contact Us'].map((text, index) => (
          <ListItem button key={text} onClick = {handleClick(text)}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
        <ListItem button key={"Home"} onClick={handleClick("Home")}>
          <ListItemIcon>
            {0 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={"Home"} />
        </ListItem>
        <ListItem
          button
          key={"Categories"}
          onClick={handleClickCat}
          className="cat-container"
        >
          <ListItemIcon>
            {1 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={"Categories"} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              className="item-dr"
              onClick={event => {
                setState({ left: false });
                props.changeOpen(false);
                props.history.push("/items/1");
              }}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Shrimp" />
            </ListItem>
            <ListItem
              button
              className="item-dr"
              onClick={event => {
                setState({ left: false });
                props.changeOpen(false);
                props.history.push("/items/2");
              }}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Ca Mau Crabs" />
            </ListItem>
            <ListItem
              button
              className="item-dr"
              onClick={event => {
                setState({ left: false });
                props.changeOpen(false);
                props.history.push("/items/3");
              }}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Squid" />
            </ListItem>
            <ListItem
              button
              className="item-dr"
              onClick={event => {
                setState({ left: false });
                props.changeOpen(false);
                props.history.push("/items/4");
              }}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Fish" />
            </ListItem>
            <ListItem
              button
              className="item-dr"
              onClick={event => {
                setState({ left: false });
                props.changeOpen(false);
                props.history.push("/items/5");
              }}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Other Products" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button key={"About Us"} onClick={handleClick("About Us")}>
          <ListItemIcon>
            {2 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={"About Us"} />
        </ListItem>
        <ListItem button key={"Contact Us"} onClick={handleClick("Contact Us")}>
          <ListItemIcon>
            {3 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
          </ListItemIcon>
          <ListItemText primary={"Contact Us"} />
        </ListItem>
        {JSON.parse(localStorage.getItem("userItem")) !== null ? (
          <ListItem button key={"Profile"} onClick={handleProfile("profile")}>
            <ListItemIcon>
              {4 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
        ) : (
          <ListItem button key={"Login"} onClick={handleLogin("Login")}>
            <ListItemIcon>
              {4 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={"Login"} />
          </ListItem>
        )}
        {JSON.parse(localStorage.getItem("userItem")) !== null ? (
          <ListItem button key={"Logout"} onClick={handleLogout("profile")}>
            <ListItemIcon>
              {5 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        ) : (
          <ListItem
            button
            key={"Register"}
            onClick={handleRegister("register")}
          >
            <ListItemIcon>
              {5 % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={"Register"} />
          </ListItem>
        )}
      </List>
      {/* <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );
  return (
    <div>
      <Drawer open={props.isOpen} onClose={handleClose}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}

export default withRouter(Drawser);
