import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {AppBar, Toolbar, Button, Hidden} from '@material-ui/core';

import styles from './Header.module.css';

const Header = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <h4 style={{flexGrow: 1}}>Cristo Rey Catecismo</h4>
                <Hidden smDown>
                    <Button color="inherit" component={NavLink} to="/" exact activeClassName={styles.active}>
                        <FormattedMessage id="Home" defaultMessage={"Home"} />
                    </Button>
                    <Button color="inherit" component={NavLink} to="/prayers" activeClassName={styles.active}>
                        <FormattedMessage id="Prayers" defaultMessage={"Prayers"} />
                    </Button>
                    <Button color="inherit" component={NavLink} to="/flashcards" activeClassName={styles.active}>
                        <FormattedMessage id="Flashcards" defaultMessage={"Flashcards"} />
                    </Button>
                    <Button color="inherit" component={NavLink} to="/settings" activeClassName={styles.active}>
                        <FormattedMessage id="Settings" defaultMessage={"Settings"} />
                    </Button>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default Header;