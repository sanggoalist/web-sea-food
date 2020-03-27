import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import '../styles/HomeContent.scss';
import { withRouter } from 'react-router-dom';

class HomeContent extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            url: null,
            isUrl: false,
            maxWidth: 501
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    }
    classes  = makeStyles(theme => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.paper,
        },
        gridList: {
          width: 500,
          height: 450,
          // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
          transform: 'translateZ(0)',
        },
        titleBar: {
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
        },
        icon: {
          color: 'white',
        },
        imgStyle: {
            height: 100
        }
      }));
      
      /**
       * The example data is structured as follows:
       *
       * import image from 'path/to/image.jpg';
       * [etc...]
       *
       * const tileData = [
       *   {
       *     img: image,
       *     title: 'Image',
       *     author: 'author',
       *     featured: true,
       *   },
       *   {
       *     [etc...]
       *   },
       * ];
       */

    handleClick(event){
        this.props.history.push(`items/${event}`);

    }
    componentDidMount() {
        window.addEventListener("resize", this.updateWindowDimensions());
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions)
    }
    
    updateWindowDimensions() {
       this.setState({ maxWidth: window.innerWidth });
    }
    render() {

        const tileData = [
            {
                img: 'https://www.citarella.com/media/catalog/product/cache/1/image/97a78116f02a369697db694bbb2dfa59/0/2/024008100000_01_2.jpg',
                title: 'Shrimp',
                author: 'author',
                cols: (this.state.maxWidth > 500)? 1: 3,
                featured: false,
                type: 1                
            },
            {
                img: 'https://haisanphuongnam.com/asset/upload/image/cua_th%E1%BB%8Bt_c%C3%A0_mau.jpg',
                title: 'Ca Mau Crabs',
                author: 'author',
                cols: (this.state.maxWidth > 500)? 1: 3,
                featured: false,
                type: 2
            },
            {
                img: 'https://i.guim.co.uk/img/media/31c4eb21065a493285c5bb6d90f141ccc59c848b/0_80_1066_640/master/1066.jpg?width=1920&quality=85&auto=format&fit=max&s=cf081fb75af25557e40d7a3252084075',
                title: 'Squid',
                author: 'author',
                cols: (this.state.maxWidth > 500)? 1: 3,
                featured: false,
                type: 3
            },
            {
                img: 'https://haisanvungtau.vn/wp-content/uploads/2018/06/mua-ca-ngu-dai-duong-tai-vung-tau-1-1.png',
                title: 'Fish',
                author: 'author',
                cols: (this.state.maxWidth > 500)? 1: 3,
                featured: false,
                type: 4
            }, 
            {
                img: 'https://188loto.com/wp-content/uploads/2019/10/mo-bat-duoc-ba-ba-danh-con-gi-2.jpg',
                title: 'The other products',
                author: 'author',
                cols: (this.state.maxWidth > 500)? 2: 3,
                featured: false,
                type: 5
            },           
        ];
      return (
        <div className="HomeContent">
            {
            <div className={this.classes.root}>
            <GridList cellHeight={200} spacing={1} className={this.classes.gridList} cols = {3}>
                {
                tileData.map(tile => (
                <GridListTile key={tile.img} cols={tile.cols} rows={2} onClick = {event => this.handleClick(tile.type)}>
                    <img src={tile.img} alt={tile.title} />
                    <GridListTileBar
                    title={tile.title}
                    titlePosition="top"
                    actionIcon={
                        <IconButton aria-label={`star ${tile.title}`} className={this.classes.icon}>
                        <StarBorderIcon />
                        </IconButton>
                    }
                    actionPosition="left"
                    className={this.classes.titleBar}
                    />
                </GridListTile>
                ))
                }
            </GridList>
            </div>
            }
        </div>
      );
    }
}
export default withRouter(HomeContent);
