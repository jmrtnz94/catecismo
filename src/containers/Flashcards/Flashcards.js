import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Grid, CircularProgress, Button, Hidden} from '@material-ui/core';

import Flashcard from './Flashcard/Flashcard';

class Flashcards extends Component {
    state = {
        selectedFlashcard: null,
        showAnswer: false,
        flashcardIndex: 0
    }

    componentDidMount(){
        if(!this.props.isLoading && this.props.flashcards !== null){
            this.setState({selectedFlashcard: this.props.flashcards[0]});
        }
    }

    componentDidUpdate(prevProps){
        if(this.props.isLoading !== prevProps.isLoading){
            if(!this.props.isLoading){ // only set if isLoading is false
                this.setState({
                    selectedFlashcard: this.props.flashcards[0], // set first flashcard
                });
            }
        }
    }

    prevCardHandler = () => {
        const oldFlashcardIndex = this.state.flashcardIndex;
        if(oldFlashcardIndex <= 0){return;}

        const newFlashcardIndex = oldFlashcardIndex-1;
        const flashcard = this.props.flashcards[newFlashcardIndex];
        this.setState({selectedFlashcard: flashcard, flashcardIndex: newFlashcardIndex, showAnswer: false});
    }

    nextCardHandler = () => {
        const oldFlashcardIndex = this.state.flashcardIndex;
        if(oldFlashcardIndex >= this.props.flashcards.length-1){return;}

        const newFlashcardIndex = oldFlashcardIndex+1;
        const flashcard = this.props.flashcards[newFlashcardIndex];
        this.setState({selectedFlashcard: flashcard, flashcardIndex: newFlashcardIndex, showAnswer: false});
    }

    cardClickedHandler = () => {
        this.setState({showAnswer: !this.state.showAnswer});
    }
    
    render() {
        let flashcardHtml = <CircularProgress/>;
        if(!this.props.isLoading && this.state.selectedFlashcard !== null){
            flashcardHtml = (
                <>
                    <Hidden xsDown>
                        <Grid item sm={2} onClick={this.prevCardHandler}></Grid>
                    </Hidden>
                    <Grid item xs={12} sm={8}>
                        <Grid container spacing={16} justify="center">
                            <Grid item xs={11}>
                                <Flashcard 
                                    question={this.state.selectedFlashcard.question} 
                                    answer={this.state.selectedFlashcard.answer}
                                    showAnswer={this.state.showAnswer}
                                    prev={this.prevCardHandler}
                                    next={this.nextCardHandler}
                                    cardClicked={this.cardClickedHandler} />
                            </Grid>
                            <Hidden xsDown>
                                <Grid item xs={5}>
                                    <Button variant="contained" color="primary" fullWidth onClick={this.prevCardHandler}>
                                        <FormattedMessage id="Previous" defaultMessage="Previous" />
                                    </Button>
                                </Grid>
                                <Grid item xs={1} />
                                <Grid item xs={5}>
                                    <Button variant="contained" color="primary" fullWidth onClick={this.nextCardHandler}>
                                        <FormattedMessage id="Next" defaultMessage="Next" />
                                    </Button>
                                </Grid>
                            </Hidden>
                        </Grid>
                    </Grid>
                    <Hidden xsDown>
                        <Grid item sm={2} onClick={this.nextCardHandler}></Grid>
                    </Hidden>
                </>
            );
        };

        return (
            <Grid container spacing={16} justify="center">
                {flashcardHtml}
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

export default connect(mapStateToProps)(Flashcards);