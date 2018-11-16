import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {Header, Footer} from '../../components/Layouts/index';

class Layout extends Component{
    render() {
        return(
            <>
                <Header />

                <div style={{maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto'}}>
                    <div style={{margin: '10px 10px 50px 10px'}}>
                        {this.props.children}
                    </div>
                </div>

                <Footer pathname={this.props.history.location.pathname} />
            </>
        )
    }
}

export default withRouter(Layout);