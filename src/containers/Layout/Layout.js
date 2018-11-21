import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {Header, Footer} from '../../components/Layouts/index';

import styles from './Layout.module.css';

class Layout extends Component{
    render() {
        return(
            <>
                <Header />

                <div className={styles['layout-wrapper']}>
                    <div className={styles['layout']}>
                        {this.props.children}
                    </div>
                </div>

                <Footer pathname={this.props.history.location.pathname} />
            </>
        )
    }
}

export default withRouter(Layout);