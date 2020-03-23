import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import './ItemInfo.scss';
import Icon from '@material-ui/core/Icon';
import firebase from '../Firebase';

class ItemInfo extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isFaverite: this.props.item.isFavor
        }
        this.clickFavorite = this.clickFavorite.bind(this);
    }
    componentDidMount(){

    }
    clickFavorite(){
        var category = "";
        var catId = +this.props['categoryId'];
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
        const ref = firebase.database().ref(`products/${category}/sell/${this.props.index}`);
        const item =this.props.item;
        item.isFavor = !this.state.isFaverite;
        ref.update(item).then(res => {
            this.setState({isFaverite: !this.state.isFaverite});
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
      return (
        <div className="ItemInfo">
            <Grid container spacing={0} className = "ItemInfoContainer">
                <Grid item xs={2}>
                    {/* <Paper className = "paper-info"><div>AVATAR</div></Paper> */}
                    <div className = "paper-i avatar-i"><div className = "image-wrapper">
                                <img src = {this.props.item.img}></img>
                            </div>
                        </div>
                </Grid>
                <Grid item xs={8}>
                    {/* <Paper className = "paper-info"><div>CONTENT</div></Paper> */}
                    <div className = "paper-i content-i">
                    <Grid container spacing={0} className = "content-contain">
                        <Grid item xs={12}>
                            <div className = "title-wrapper"><div className ="title-i">{this.props.item.title}</div></div>
                        </Grid>
                        <Grid item xs={12}>
                            <div>
                                <div className = "price-i">{this.props.item.price} $</div>
                            </div>
                        </Grid>
                        <Grid item xs={12} className = "title-end">
                            <div>
                                <div className ="title-end-i">{this.props.item.location}</div>
                            </div>
                        </Grid>
                    </Grid>
                    </div>
                </Grid>
                <Grid item xs={2}>
                    <div className = "paper-i info-i">
                        <Icon className = "icon-i" fontSize = "large" onClick = {event => this.clickFavorite()}>{this.state.isFaverite ? 'favorite': 'favorite_border'}</Icon>
                    </div>
                    
                </Grid>
            </Grid>
        </div>
      );
    }
}
export default ItemInfo;