import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Grid, Paper, Card, CardMedia, Hidden, Button } from '@material-ui/core';

import logo from '../../assets/images/cristo-rey-logo.png';

import styles from './Homepage.module.css';

class Homepage extends Component {
    render() {
        return (
            <Grid container spacing={16} justify="center">
                <Hidden xsDown>
                    <Grid item sm={3} />
                </Hidden>
                <Grid item xs={12} sm={6}>
                    <Card className={styles['homepage-padding']}>
                        <CardMedia
                            component="img"
                            alt="Logo"
                            height="100%"
                            image={logo}
                            title="Logo"/>
                    </Card>
                </Grid>
                <Hidden xsDown>
                    <Grid item sm={3} />
                </Hidden>
                
                <Grid item xs={12}>
                    <Paper className={styles['homepage-padding']}>
                        <h1><FormattedMessage id="homepage.title" defaultMessage="Welcome Class!"/></h1>
                        <p><FormattedMessage id="homepage.description" defaultMessage="Lost your book? No more excuses, I know you have your phone..."/></p>
                        <p><FormattedMessage id="homepage.description2" defaultMessage="Use this website to study your prayers and questions!"/></p>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Grid container spacing={16} justify="center" alignItems="stretch">
                        <Grid item xs={6}>
                            <Paper className={styles['homepage-padding']} style={{height: '100%'}}>
                                <h3><FormattedMessage id="Prayers" defaultMessage="Prayers" /></h3>
                                <p><FormattedMessage id="homepage.prayers.body" defaultMessage="Click here to study Prayers..." /></p>
                                <Button variant="contained" color="primary" fullWidth onClick={() => {this.props.history.push('/prayers');}}>
                                    <FormattedMessage id="Go" defaultMessage="Go"/>
                                </Button>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={styles['homepage-padding']} style={{height: '100%'}}>
                                <h3><FormattedMessage id="Flashcards" defaultMessage="Flashcards" /></h3>
                                <p><FormattedMessage id="homepage.flashcards.body" defaultMessage="Click here to study questions on flashcards..." /></p>
                                <Button variant="contained" color="primary" fullWidth onClick={() => {this.props.history.push('/flashcards');}}>
                                    <FormattedMessage id="Go" defaultMessage="Go"/>
                                </Button>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default Homepage;