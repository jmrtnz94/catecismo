import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Grid, Paper, CircularProgress, Button, Hidden} from '@material-ui/core';

class SelectFlashcard extends Component {
    state = {
        
    }

    handleClick= (min, max) =>{
        
    }
    
    render() {
        return (
            <Grid container spacing={16} justify="space-evenly">
                <Grid item xs={12}>
                    <Paper style={{padding: 20}}>
                        <h1>Select Flashcard</h1>
                        <p>Select the flashcards you would like to study.</p>
                    </Paper>
                </Grid>
                <Grid item xs={10}>
                    <Paper style={{padding: 2, textAlign: 'center'}} onClick={() => this.handleClick(1,10)}>
                        <h5>Week 1</h5>
                        <p>Questions (1-10)</p>
                    </Paper>
                </Grid>
                {/* <Grid item xs={10}>
                    <Paper style={{padding: 2, textAlign: 'center'}}>
                        <h5>Week 1</h5>
                        <p>(11-20)</p>
                    </Paper>
                </Grid>
                <Grid item xs={10}>
                    <Paper style={{padding: 2, textAlign: 'center'}}>
                        <h5>Week 1</h5>
                        <p>(1-10)</p>
                    </Paper>
                </Grid>
                <Grid item xs={10}>
                    <Paper style={{padding: 2, textAlign: 'center'}}>
                        <h5>Week 1</h5>
                        <p>(1-10)</p>
                    </Paper>
                </Grid> */}
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        flashcards: state.test,
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps)(SelectFlashcard);