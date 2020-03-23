import React from 'react';
import './UserSell.scss';
import { CircularProgress } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ItemInfo from '../ItemInfo';
import firebase from '../../Firebase';
import { withRouter } from 'react-router-dom';
class UserSell extends React.Component {
    
    constructor(props){
        super(props);
        this.moveToDetail = this.moveToDetail.bind(this);
        this.state = {
            items: [],
            loaded: false
        }
    }
    componentDidMount(){
        const userId = +JSON.parse(localStorage.getItem("userItem"))["userId"];
        const arr1 = ["shrimp", "cm-crab", "squid", "fish", "other"];
        const ref = firebase.database().ref(`products`);
        ref.on('value', (snapshoot) => {
            var obj = {};
            var totalArr = [];
            if (snapshoot.val() !== null){
                obj = snapshoot.val();
                arr1.forEach(i => {
                    var r = [];
                    if (obj[i]){
                        r = obj[i]["sell"];
                        console.log(r)
                        Object.keys(r).map(function(key) {
                            if (r[key]['userId']=== userId){
                                totalArr.push(r[key]);
                            }
                            
                        });
                    }
                })
                
            }
            this.setState({items: totalArr, loaded: true});
          
        });
      } 
    moveToDetail(event, item){
        // event.stopPropagation();
        for (let index = 0; index < document.getElementsByClassName('btn-i').length; index++) {
            if (event.target === document.getElementsByClassName('btn-i').item(index)){
                return;
            }
            
        }
        for (let index = 0; index < document.getElementsByClassName('icon-i').length; index++) {
            if (event.target === document.getElementsByClassName('icon-i').item(index)){
                return;
            }
            
        }
        var category = "";
        var catId = +item['categoryId'];
        if (catId === 1){
            category = "shrimp";
        } else if (catId === 2){
            category = "cm-crab";
        }
        else if (catId === 3){
            category = "squid";
        }
        else if (catId === 4){
            category = "fish";
        }
        else if (catId === 5){
            category = "other";
        }     
         else {
            return;
        }
        this.props.history.push(`/items/${catId}/sell/${item['id']}`);
    }
    render() {
      return (
        <div className="UserSell">
             {(!this.state.loaded) ? <CircularProgress />: 
            <div className = "UserSellWrapper">
            <Grid container spacing={3} className = "UserSellContainer">
                    {this.state.items.map(item => {
                    return <Grid key = {item.id} item xs={12} className ="grid-container">
                        <Paper  className = "paper" onClickCapture = {event => {this.moveToDetail(event, item)}}>
                            <ItemInfo index = {item['id']} categoryId = {item.categoryId} item = {item}></ItemInfo>
                        </Paper>
                    </Grid>                       
                    })}
            </Grid>
            </div>}
        </div>
      );
    }
}
export default withRouter(UserSell);