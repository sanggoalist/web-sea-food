import React from 'react';
import { withRouter } from 'react-router-dom';
import './ItemDetail.scss';
import Icon from '@material-ui/core/Icon';
import firebase from '../Firebase';
import CircularProgress from '@material-ui/core/CircularProgress';
import SpringModal from './SpringModal';


class ItemDetail extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isFaverite: false,
            isLoad: true,
            item: {
                id: 0,
                location: "",
                isFavor: false,
                title: "",
                price: 0,
                content: ""
            }
        }
        this.clickFavorite = this.clickFavorite.bind(this);
    }
    componentDidMount(){
        const ref = firebase.database().ref(`products/shrimp/sell/${this.props.match.params['idd']}`);
        ref.on('value', (snapshoot) => {
            this.setState({item: snapshoot.val(), isLoad: false});
        });
    }
    clickFavorite(){
        const ref = firebase.database().ref(`products/shrimp/sell/${this.props.match.params['idd']}`);
        const item =this.state.item;
        item.isFavor = !this.state.item.isFavor;
        ref.update(item).then(res => { 
        }).catch(err => {
            console.log(err);
        })
    }
    render() {
      return (
        <div className="ItemDetail">
                    {(this.state.isLoad) ? <SpringModal load = {this.state.isLoad}/>: '' }
                    <div className ="detail-img-wrapper">
                        <img src ="https://d213sdapb08052.cloudfront.net/assets/recipes/roasted-shrimp-cocktail/_entryTopPhotoLarge/39-roasted-shrimp-web-horizon.jpg?mtime=20160725113522" alt ="Detail Picture"></img>
                    </div>
                    <div className ="d-title-wrapper">
                        <div className ="d-title">
                            <div className ="dd-title">{this.state.item.title}</div>
                            <Icon className = "dd-icon" fontSize = "large" onClick = {event => this.clickFavorite()}>{this.state.item.isFavor ? 'favorite': 'favorite_border'}</Icon>
                        </div>
                    </div>
                    <div className ="d-content">
                        <div className ="d-content-price">{this.state.item.price} $</div>
                        <div className ="d-content-location"><Icon>place</Icon><div>{this.state.item.location}</div></div>
                        <div className ="d-content-main">{this.state.item.content}</div>
                    </div>
        </div>
      );
    }
}
export default withRouter(ItemDetail);