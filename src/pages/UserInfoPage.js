import React from 'react';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './UserInfoPage.scss';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

class UserInfoPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            value: 'one'
        }
        this.handleChange = this.handleChange.bind(this);
    }

      
    a11yProps(index) {
        return {
          id: `wrapped-tab-${index}`,
          'aria-controls': `wrapped-tabpanel-${index}`,
        };
      }
       handleChange = (event, newValue) => {
           console.log(newValue)
        this.setState({value: newValue});
      };
    render() {
        TabPanel.propTypes = {
            children: PropTypes.node,
            index: PropTypes.any.isRequired,
            value: PropTypes.any.isRequired,
          };
      return (
        <div className="UserInfoPage">
            <Grid container spacing={3}>
                <Grid item xs={12} md = {3}>
                    <Paper>xs=8</Paper>
                </Grid>
                <Grid item xs={12} md = {9}>
                    <Paper>
                        <AppBar position="static">
                            <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                            <Tab
                                    value="one"
                                    label="New Arrivals in the Longest Text of Nonfiction"
                                    wrapped
                                    {...this.a11yProps('one')}
                                />
                                <Tab value="two" label="Item Two" {...this.a11yProps('two')} />
                                <Tab value="three" label="Item Three" {...this.a11yProps('three')} />
                            </Tabs>
                        </AppBar>
                        <TabPanel value={this.state.value} index={"one"}>
                            Item One
                        </TabPanel>
                        <TabPanel value={this.state.value} index={"two"}>
                            Item Two
                        </TabPanel>
                        <TabPanel value={this.state.value} index={"three"}>
                            Item Three
                        </TabPanel>
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
        value: PropTypes.any.isRequired,
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
      backgroundColor: theme.palette.background.paper,
    },
  }));
  
export default withRouter(UserInfoPage);