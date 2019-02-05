import React, { Component } from 'react';
import {FormattedMessage} from 'react-intl';
import {Grid, CircularProgress, Button, Hidden, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider} from '@material-ui/core';

import Flashcard from './Flashcard/Flashcard';

class FlashcardControls extends Component {
    state = {
        selectedFlashcard: null,
        showAnswer: false,
        flashcardIndex: 0,
        openInstructions: false
    }

    componentDidMount(){
        if(!this.props.isLoading && this.props.flashcards !== null){
            this.setState({selectedFlashcard: this.props.flashcards[0]});
        }

        this.shouldDisplayInstructions();
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

    shouldDisplayInstructions = () => {
        const locale = localStorage.getItem("locale");
        const viewedInstructions = localStorage.getItem("viewed_fc_instructions_"+locale);
        if(!viewedInstructions){
            this.setState({ openInstructions: true });
        } else {
            this.setState({ openInstructions: false });
        }
    }

    closeInstructions = () => {
        const locale = localStorage.getItem("locale");
        localStorage.setItem("viewed_fc_instructions_"+locale, true);
        this.setState({ openInstructions: false });
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
                                    flashcard={this.state.selectedFlashcard}
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
                                <Grid item xs={1}/>
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

                    <Dialog
                        open={this.state.openInstructions}
                        onClose={this.closeInstructions}
                        aria-labelledby="instructions-dialog-title"
                        aria-describedby="instructions-dialog-description">
                        <DialogTitle id="instructions-dialog-title">
                            <FormattedMessage id="flashcards.instructions.title" defaultMessage="Instructions" /><Divider/>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="instructions-dialog-description" component='div'>
                                <h5><FormattedMessage id="flashcards.instructions.mobile.title" defaultMessage="Mobile Users" />:</h5>
                                <p><FormattedMessage id="flashcards.instructions.mobile.body" defaultMessage="Swipe left and right to move between flashcard. Tap on a flashcard to view answer."/></p>
                                <Divider/>
                                <h5><FormattedMessage id="flashcards.instructions.desktop.title" defaultMessage="Desktop Users"/>:</h5>
                                <p><FormattedMessage id="flashcards.instructions.desktop.body" defaultMessage="Click on Previous and Next buttons to move between flashcard. Click on a flashcard to view answer."/></p>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.closeInstructions} color="primary" autoFocus>
                                <FormattedMessage id="OK" defaultMessage="OK" />
                            </Button>
                        </DialogActions>
                    </Dialog>
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

export default FlashcardControls;