import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../pages/SellPage.scss';
import ItemInfo from '../components/ItemInfo';
import firebase from '../Firebase';

class SellPage extends React.Component {
    
    constructor(props){
        super(props);
        this.moveToDetail = this.moveToDetail.bind(this);
        this.state = {
            items: []
        }
    }
    componentDidMount(){
        var category = "";
        if (+this.props.match.params['id'] === 1){
            category = "shrimp";
        } else if (+this.props.match.params['id'] === 2){
            category = "cm-crab";
        }
        else if (+this.props.match.params['id'] === 3){
            category = "squid";
        }
        else if (+this.props.match.params['id'] === 4){
            category = "fish";
        }
        else if (+this.props.match.params['id'] === 5){
            category = "other";
        }     
         else {
            category = "shrimp";
        }
        const ref = firebase.database().ref(`users/${category}/sell`);
        ref.on('value', (snapshoot) => {
          this.setState({items: (snapshoot.val() == null)? []:snapshoot.val()});
        });
      } 
    moveToDetail(event, index){
        // event.stopPropagation();
        for (let index = 0; index < document.getElementsByClassName('icon-i').length; index++) {
            if (event.target === document.getElementsByClassName('icon-i').item(index)){
                return;
            }
            
        }
        this.props.history.push(`/items/${this.props.match.params['id']}/sell/${index-1}`);
    }
    render() {
        // const list = [];
        // for (let index = 0; index < 10; index++) {
        //     list.push(<Grid key = {index} item xs={12}>
        //                 <Paper  className = "paper" onClickCapture = {event => {this.moveToDetail(event, index)}}>
        //                     <ItemInfo index = {index}></ItemInfo>
        //                 </Paper>
        //             </Grid>
        //     );
            
        // }
      return (
        <div className="SellPage">
            <div className = "SellPageWrapper">
            <Grid container spacing={3} className = "SellPageContainer">
                    {this.state.items.map(item => {
                    return <Grid key = {item.id} item xs={12} className ="grid-container">
                        <Paper  className = "paper" onClickCapture = {event => {this.moveToDetail(event, item.id)}}>
                            <ItemInfo index = {item.id} item = {item}></ItemInfo>
                        </Paper>
                    </Grid>                       
                    })}
            </Grid>
            </div>
        </div>
      );
    }
}
export default withRouter(SellPage);