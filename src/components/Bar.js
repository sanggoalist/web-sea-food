import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import SvgIcon from "@material-ui/icons/Menu";
import { ReactComponent as StarIcon } from "../../src/logo.svg";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
}));

function Bar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    // props.history.push('/user/profile');
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/home");
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleRegister = () => {
    localStorage.clear();
    props.history.push("/user/register");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleOpenProfile = () => {
    props.history.push("/user/profile");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleOpenProducts = () => {
    props.history.push("/user/products");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleOpenProduct = () => {
    props.history.push("/user/products");
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLogin = () => {
    props.history.push("/login");
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClick = event => {
    props.changeOpen(true);
  };
  const handleClickLogo = event => {
    props.history.push("/home");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {JSON.parse(localStorage.getItem("userItem")) !== null ? (
        <MenuItem onClick={handleOpenProfile}>Profile</MenuItem>
      ) : (
        <MenuItem onClick={handleLogin}>Login</MenuItem>
      )}
      {JSON.parse(localStorage.getItem("userItem")) !== null ? (
        <MenuItem onClick={handleOpenProduct}>Your Products</MenuItem>
      ) : (
        ""
      )}
      {JSON.parse(localStorage.getItem("userItem")) !== null ? (
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      ) : (
        <MenuItem onClick={handleRegister}>Register</MenuItem>
      )}
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      {JSON.parse(localStorage.getItem("userItem")) !== null ? (
        <MenuItem onClick={handleOpenProfile}>
          <Avatar
            className="profile-avatar"
            alt="User Avatar"
            src={JSON.parse(localStorage.getItem("userItem"))["img"]}
          ></Avatar>
          <p>&nbsp;&nbsp;Profile</p>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleLogin}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      )}
      {JSON.parse(localStorage.getItem("userItem")) !== null ? (
        <MenuItem onClick={handleOpenProducts}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Your products</p>
        </MenuItem>
      ) : (
        ""
      )}
      {JSON.parse(localStorage.getItem("userItem")) !== null ? (
        <MenuItem onClick={handleLogout}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      ) : (
        <MenuItem onClick={handleRegister}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Register</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      {props.location.pathname !== "/login" ? (
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              noWrap
              onClick={handleClickLogo}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={
                  <SvgIcon
                    className="logo"
                    component={StarIcon}
                    viewBox="0 0 1000 1000"
                  />
                }
              >
                Sang Sea Food
              </Button>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                {JSON.parse(localStorage.getItem("userItem")) == null ? (
                  <AccountCircle />
                ) : (
                  <Avatar
                    className="profile-avatar"
                    alt="User Avatar"
                    src={JSON.parse(localStorage.getItem("userItem"))["img"]}
                  ></Avatar>
                )}
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      ) : (
        ""
      )}
      {props.location.pathname !== "/login" ? renderMobileMenu : ""}
      {props.location.pathname !== "/login" ? renderMenu : ""}
    </div>
  );
}
export default withRouter(Bar);
