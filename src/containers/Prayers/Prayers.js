import React, { Component } from 'react';
import {connect} from 'react-redux';
import { FormattedMessage } from 'react-intl';

import {Grid, Paper, CircularProgress, Button, Hidden} from '@material-ui/core';

import styles from './Prayers.module.css';


class Prayers extends Component {
    state = {
        selectedPrayer: null
    }

    selectedPrayerHandler = (id) => {
        const prayers = [...this.props.prayers];
        const prayer = prayers.filter(prayer => prayer.id === id)[0]; // array.find() does not work in IE
        this.setState({selectedPrayer: prayer});
    }

    returnToPrayersHandler = () => {
        this.setState({selectedPrayer: null});
    }
    
    render() {
        let prayersMenuHtml = <CircularProgress/>;

        if(!this.props.isLoading && this.props.prayers !== null){
            prayersMenuHtml = (
                this.props.prayers.map(prayer => (
                    <Grid key={prayer.id} item xs={6} sm={4}>
                        <Paper
                            className={styles.menu}
                            //className={styles.menu+' '+(this.state.selectedPrayer !== null && prayer.id === this.state.selectedPrayer.id ? styles.active : '')} 
                            elevation={this.state.selectedPrayer !== null && prayer.id === this.state.selectedPrayer.id ? 6 : 1}
                            style={this.state.selectedPrayer !== null && prayer.id === this.state.selectedPrayer.id ? {backgroundColor: '#3f51b5', color: 'white'} : {}}
                            onClick={() => this.selectedPrayerHandler(prayer.id)}>{prayer.title}</Paper>
                    </Grid>
                ))
            );
        }

        let prayersMenuHtmlWrapper = prayersMenuHtml;

        let prayerHtml = null;
        if(this.state.selectedPrayer !== null){
            prayersMenuHtmlWrapper = (
                <Hidden xsDown>
                    {prayersMenuHtml}
                </Hidden>
            );

            prayerHtml = (
                <Grid item xs={12}>
                    <Paper style={{padding: 20}}>
                        <h4>{this.state.selectedPrayer.title}</h4>
                        <p>{this.state.selectedPrayer.body.map((line, i) => <span key={i}>{line}<br/></span>)}</p>
                    </Paper>
                    <Hidden smUp>
                        <Button variant="contained" color="primary" onClick={this.returnToPrayersHandler} style={{marginTop: 10}} fullWidth>
                            <FormattedMessage id="Back" defaultMessage="Back" />
                        </Button>
                    </Hidden>
                </Grid>
            );
        }

        return (
            <Grid container spacing={16} justify="center">
                <Grid item xs={12}>
                    <Paper style={{padding: 20}}>
                        <h1><FormattedMessage id="Prayers" defaultMessage="Prayers" /></h1>
                    </Paper>
                </Grid>
                {prayersMenuHtmlWrapper}
                {prayerHtml}
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        prayers: state.prayers,
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps)(Prayers);