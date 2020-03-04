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
        
        const ref = firebase.database().ref(`products/shrimp/sell/${this.props.index - 1}`);
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
                                <img src ="https://d213sdapb08052.cloudfront.net/assets/recipes/roasted-shrimp-cocktail/_entryTopPhotoLarge/39-roasted-shrimp-web-horizon.jpg?mtime=20160725113522"></img>
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