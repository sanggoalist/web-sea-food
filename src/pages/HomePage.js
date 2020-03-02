import React from 'react';
import HomeContent from '../components/HomeContent';

class HomePage extends React.Component {
    
    constructor(props){
        super(props);

    }
    render() {
      return (
        <div className="HomePage">
            <HomeContent/>
        </div>
      );
    }
}
export default HomePage;