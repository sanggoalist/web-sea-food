import React from "react";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./UserInfoPage.scss";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@material-ui/core/styles";
import BasicInfo from "../components/user/BasicInfo";
import AccountInfo from "../components/user/AccountInfo";
import DisplayInfo from "../components/user/DisplayInfo";

class UserInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`
    };
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired
    };
    const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
    return (
      <div className="UserInfoPage">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Paper className="display-info">
              <DisplayInfo userId={userId} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9} className="content-info">
            <Paper className="content-info-paper">
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                  aria-label="simple tabs example"
                >
                  <Tab
                    value={0}
                    label="Basic Information"
                    // wrapped
                    {...this.a11yProps(0)}
                  />
                  <Tab
                    value={1}
                    label="Contact Information"
                    {...this.a11yProps(1)}
                  />
                  <Tab value={2} label="Account" {...this.a11yProps(2)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                // axis={this.theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={this.state.value}
                onChangeIndex={event => {
                  this.handleChangeIndex();
                }}
              >
                <TabPanel value={this.state.value} index={0}>
                  <BasicInfo userId={userId} />
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                  Item Two
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                  <AccountInfo userId={userId} />
                </TabPanel>
              </SwipeableViews>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
  };
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

export default withRouter(UserInfoPage);
