import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import GrainIcon from '@material-ui/icons/Grain';
import './TopBar.scss';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Icon from '@material-ui/core/Icon';


class TopBar extends React.Component {
    
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    handleClick(event, key) {
        event.preventDefault();
        console.log(this.props)
        this.props.history.push(`/${key}`);
    }

    goBack(event){
        this.props.history.goBack();
    }

    render() {
        console.log();
        var list = [];
        if (this.props.location.pathname.includes('home')) {
        //     list.push(
        //     <Typography key ="home" color="textPrimary" className ="item-topbar">
        //         <HomeIcon />
        //         Home
        //     </Typography>
        // );
        } else if (this.props.location.pathname.includes('items')) {
            list.push(
                <Link key ="home" color="inherit" href="/" onClick={event => {this.handleClick(event, 'home')}} className ="link-topbar">
                    <HomeIcon />
                    Home
                </Link>
            );
            if (this.props.location.pathname == '/items'){
                list.push(
                    <Typography key ="items" color="textPrimary" className ="item-topbar">
                    <WhatshotIcon />
                        Items
                    </Typography>
                    );
            } else {
                
                if (this.props.location.pathname.includes('sell/')){
                    var path = "";
                    list.push(
                        <Link key ="items" color="inherit" href="/" onClick={event => {this.handleClick(event, 'home')}} className ="link-topbar">
                        <WhatshotIcon />
                            Items
                        </Link>
                    );
                    if (this.props.location.pathname.includes('items/1')){
                        path = "items/1";
                        list.push(
                            <Link key ="items/1" color="inherit" href="/" onClick={event => {this.handleClick(event, 'items/1')}} className ="link-topbar">
                            <GrainIcon />
                                Shrimp
                            </Link>        
                        );
                    } 
                    else if (this.props.location.pathname.includes('items/2')){
                        path = "items/2";
                        list.push(
                            <Link key ="items/2" color="inherit" href="/" onClick={event => {this.handleClick(event, 'items/2')}} className ="link-topbar">
                            <GrainIcon />
                                Ca Mau Crabs
                            </Link>        
                        );
                    }
                    else if (this.props.location.pathname.includes('items/3')){
                        path = "items/3";
                        list.push(
                            <Link key ="items/3" color="inherit" href="/" onClick={event => {this.handleClick(event, 'items/3')}} className ="link-topbar">
                            <GrainIcon />
                                 Squid
                            </Link>        
                        );
                    }
                    else if (this.props.location.pathname.includes('items/4')){
                        path = "items/4";
                        list.push(
                            <Link key ="items/4" color="inherit" href="/" onClick={event => {this.handleClick(event, 'items/4')}} className ="link-topbar">
                            <GrainIcon />
                                Fish
                            </Link>        
                        );
                    }
                    else if (this.props.location.pathname.includes('items/5')){
                        path = "items/5";
                        list.push(
                            <Link key ="items/5" color="inherit" href="/" onClick={event => {this.handleClick(event, 'items/5')}} className ="link-topbar">
                            <GrainIcon />
                                Other Products
                            </Link>        
                        );
                    }
                    list.push(
                        <Link key ="sell" color="inherit" href="/" onClick={event => {this.handleClick(event, path + "/sell")}} className ="link-topbar">
                        <GrainIcon />
                            Sell
                        </Link>        
                    );
                    var text = "sell/";
                    var index = this.props.location.pathname.indexOf(text);
                    list.push(
                        <Typography key ="items" color="textPrimary" className ="item-topbar">
                            {this.props.location.pathname.substring(index + text.length)}
                        </Typography>
                        );                   

                } else if (this.props.location.pathname.includes('sell')) {
                    list.push(
                        <Link key ="items" color="inherit" href="/" onClick={event => {this.handleClick(event, 'home')}} className ="link-topbar">
                        <WhatshotIcon />
                            Items
                        </Link>
                    );
                    if (this.props.location.pathname.includes('items/1')){
                        list.push(
                            <Link key ="items/1" color="inherit" href="/" onClick={event => {this.handleClick(event, 'items/1')}} className ="link-topbar">
                            <GrainIcon />
                                Shrimp
                            </Link>        
                        );
                    } 
                    else if (this.props.location.pathname.includes('items/2')){
                        list.push(
                            <Link key ="items/2" color="inherit" href="/" onClick={event => {this.handleClick(event, 'items/2')}} className ="link-topbar">
                            <GrainIcon />
                                Ca Mau Crabs
                            </Link>        
                        );
                    }
                    else if (this.props.location.pathname.includes('items/3')){
                        list.push(
                            <Link key ="items/3" color="inherit" href="/" onClick={event => {this.handleClick(event, 'items/3')}} className ="link-topbar">
                            <GrainIcon />
                                 Squid
                            </Link>        
                        );
                    }
                    else if (this.props.location.pathname.includes('items/4')){
                        list.push(
                            <Link key ="items/4" color="inherit" href="/" onClick={event => {this.handleClick(event, 'items/4')}} className ="link-topbar">
                            <GrainIcon />
                                Fish
                            </Link>        
                        );
                    }
                    else if (this.props.location.pathname.includes('items/5')){
                        list.push(
                            <Link key ="items/5" color="inherit" href="/" onClick={event => {this.handleClick(event, 'items/5')}} className ="link-topbar">
                            <GrainIcon />
                                Other Products
                            </Link>        
                        );
                    }
                    list.push(
                        <Typography key ="sell" color="textPrimary" className ="item-topbar">
                        <GrainIcon />
                            Sell
                        </Typography>        
                    );                    
                } else {
                    list.push(
                        <Link key ="items" color="inherit" href="/" onClick={event => {this.handleClick(event, 'home')}} className ="link-topbar">
                        <WhatshotIcon />
                            Items
                        </Link>
                    );
                    if (this.props.location.pathname.includes('items/1')){
                        list.push(
                            <Typography key ="items/1" color="textPrimary" className ="item-topbar">
                            <GrainIcon />
                                Shrimp
                            </Typography>        
                        );
                    } 
                    else if (this.props.location.pathname.includes('items/2')){
                        list.push(
                            <Typography key ="items/2" color="textPrimary" className ="item-topbar">
                            <GrainIcon />
                                Ca Mau Crabs
                            </Typography>        
                        );
                    }
                    else if (this.props.location.pathname.includes('items/3')){
                        list.push(
                            <Typography key ="items/3" color="textPrimary" className ="item-topbar">
                            <GrainIcon />
                                 Squid
                            </Typography>        
                        );
                    }
                    else if (this.props.location.pathname.includes('items/4')){
                        list.push(
                            <Typography key ="items/4" color="textPrimary" className ="item-topbar">
                            <GrainIcon />
                                Fish
                            </Typography>        
                        );
                    }
                    else if (this.props.location.pathname.includes('items/5')){
                        list.push(
                            <Typography key ="items/5" color="textPrimary" className ="item-topbar">
                            <GrainIcon />
                                Other Products
                            </Typography>        
                        );
                    }
                }

            }


        } 
        
        else {
            // list.push(
            //     <Typography key ="home" color="textPrimary" className ="item-topbar">
            //         <HomeIcon />
            //         Home
            //     </Typography>
            // );
        }
      return (
        <div className="TopBar">

                {(this.props.location.pathname !== '/home' && this.props.location.pathname !== '/' && this.props.location.pathname !== '/login' && !this.props.location.pathname.includes("user"))? <Button onClick ={event => {this.goBack(event)}} className ="topbar-button" variant="contained" color="primary" startIcon={<Icon>arrow_back_ios</Icon>}>
                    Go Back
                </Button>: ''}
                <Breadcrumbs aria-label="breadcrumb">
                    {list}
                </Breadcrumbs>
                
        </div>
      );
    }
}
export default withRouter(TopBar);