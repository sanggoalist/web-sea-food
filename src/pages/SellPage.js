import React from 'react';
import { withRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../pages/SellPage.scss';
import ItemInfo from '../components/ItemInfo';

class SellPage extends React.Component {
    
    constructor(props){
        super(props);
        this.moveToDetail = this.moveToDetail.bind(this);

    }
    moveToDetail(event, index){
        // event.stopPropagation();
        for (let index = 0; index < document.getElementsByClassName('icon-i').length; index++) {
            if (event.target === document.getElementsByClassName('icon-i').item(index)){
                return;
            }
            
        }
        this.props.history.push(`/items/${this.props.match.params['id']}/sell/${++index}`);
    }
    render() {
        const list = [];
        for (let index = 0; index < 10; index++) {
            list.push(<Grid key = {index} item xs={12}>
                        <Paper  className = "paper" onClickCapture = {event => {this.moveToDetail(event, index)}}>
                            <ItemInfo index = {index}></ItemInfo>
                        </Paper>
                    </Grid>
            );
            
        }
      return (
        <div className="SellPage">
            <div className = "SellPageWrapper">
            <Grid container spacing={3} className = "SellPageContainer">
                    {list}
            </Grid>
            </div>
        </div>
      );
    }
}
export default withRouter(SellPage);