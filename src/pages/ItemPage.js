import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../pages/ItemPage.scss';
import '../../src/animation.scss';
import firebase from '../Firebase';

class ItemPage extends React.Component {
    
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);

    }
    handleClick(){
      this.props.history.push(`/items/${this.props.match.params['id']}/sell`);
    }
    componentDidMount(){
      // const ref = firebase.database().ref('products/shrimp/sell');
      // ref.on('value', (snapshoot) => {
      //   console.log(snapshoot.val());
      // });
    }      
    render() {
      return (
        <div className="ItemPage">
            <div className = "ItemPageWrapper">
            <Grid container spacing={3} className = "ItemPageContainer">
                <Grid item xs={6}>
                <Paper className = "paper left zoomIn animated" onClick = {event => this.handleClick()}><div className = "paper-content left">SELL PRODUCTS</div></Paper>
                </Grid>
                <Grid item xs={6}>
                <Paper className = "paper right zoomIn animated"><div className = "paper-content right">BUY PRODUCTS</div></Paper>
                </Grid>
            </Grid>
            </div>
        </div>
      );
    }
}

export default withRouter(ItemPage);