import React from 'react';
import {NavLink} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import {BottomNavigation, BottomNavigationAction, Hidden} from '@material-ui/core';
import {HomeOutlined, ImportContactsOutlined, ViewCarouselOutlined, SettingsOutlined} from '@material-ui/icons'; //or ViewArray

const Footer = (props) => {

    const styles = {
        root: {
            width: '100%',
            position: 'fixed',
            bottom: 0,
        },
    };

    return (
        <Hidden mdUp>
            <BottomNavigation
                value={props.pathname}
                showLabels
                style={styles.root}>
                <BottomNavigationAction icon={<HomeOutlined />} value="/" component={NavLink} to="/" exact 
                    label={<FormattedMessage id="Home" defaultMessage={"Home"} />} />
                <BottomNavigationAction icon={<ImportContactsOutlined />} value="/prayers" component={NavLink} to="/prayers" 
                    label={<FormattedMessage id="Prayers" defaultMessage={"Prayers"} />} />
                <BottomNavigationAction icon={<ViewCarouselOutlined />} value="/flashcards" component={NavLink} to="/flashcards" 
                    label={<FormattedMessage id="Flashcards" defaultMessage={"Flashcards"} />} />
                <BottomNavigationAction icon={<SettingsOutlined />} value="/settings" component={NavLink} to="/settings" 
                    label={<FormattedMessage id="Settings" defaultMessage={"Settings"} />} />
            </BottomNavigation>
        </Hidden>
    );
};

export default Footer;