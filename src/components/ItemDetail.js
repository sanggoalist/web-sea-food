import React from 'react';
import { withRouter } from 'react-router-dom';
import './ItemDetail.scss';
import Icon from '@material-ui/core/Icon';


class ItemDetail extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            isFaverite: false
        }
    }
    render() {
      return (
        <div className="ItemDetail">
                <div className ="detail-img-wrapper">
                    <img src ="https://d213sdapb08052.cloudfront.net/assets/recipes/roasted-shrimp-cocktail/_entryTopPhotoLarge/39-roasted-shrimp-web-horizon.jpg?mtime=20160725113522" alt ="Detail Picture"></img>
                </div>
                <div className ="d-title-wrapper">
                    <div className ="d-title">
                        <div className ="dd-title">Sell shrimp with the best prices</div>
                        <Icon className = "dd-icon" fontSize = "large" onClick = {event => this.setState({isFaverite: !this.state.isFaverite})}>{this.state.isFaverite ? 'favorite': 'favorite_border'}</Icon>
                    </div>
                </div>
                <div className ="d-content">
                    <div className ="d-content-price">100000$</div>
                    <div className ="d-content-location"><Icon>place</Icon><div>Tp. Ho Chi Minh</div></div>
                    <div className ="d-content-main">Content of the detail</div>
                </div>
        </div>
      );
    }
}
export default withRouter(ItemDetail);