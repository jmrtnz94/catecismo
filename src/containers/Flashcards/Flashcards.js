import React, { Component } from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {Paper, TextField, Button, CircularProgress} from '@material-ui/core';

import {updateObject, validateInput} from '../../shared/utility';
import FlashcardControls from './FlashcardControls';

class Flashcards extends Component {
    state = {
        controls: {
            min: {
                label: 'Min',
                type: 'number',
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minNumber: 1,
                    maxNumber: 92
                },
                validate: {
                    isValid: false,
                    error: {
                        label: '',
                        values: ''
                    }
                },
                touched: false
            },
            max: {
                label: 'Max',
                type: 'number',
                value: '',
                validation: {
                    required: true,
                    isNumeric: true,
                    minNumber: 1,
                    maxNumber: 92
                },
                validate: {
                    isValid: false,
                    error: {
                        label: '',
                        values: ''
                    }
                },
                touched: false
            }
        },
        formIsValid: false,
        formError: null,
        isProcessing: false,
        selectedFlashcards: null,
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                validate: validateInput(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });

        let formIsValid = true;
        for(let inputIdentifier in updatedControls){
            formIsValid = updatedControls[inputIdentifier].validate.isValid && formIsValid;
        }
        this.setState({controls: updatedControls, formIsValid: formIsValid});
    };

    submitFormHandler = (event) => {
        event.preventDefault();
        if(this.state.formIsValid){
            if(this.compareValues()){
                this.setState({isProcessing: true});
                const selectedFlashcards = this.props.flashcards.filter(flashcard => 
                    flashcard.id >= this.state.controls.min.value && flashcard.id <= this.state.controls.max.value
                )

                if(selectedFlashcards.length){
                    this.setState({selectedFlashcards: selectedFlashcards, isProcessing: false});
                } else {
                    this.setState({formError: {label: 'flashcards.error.empty_set', values: {}}, isProcessing: false})
                }
            }   
        }
    }

    compareValues = () => {
        const min = Number(this.state.controls.min.value);
        const max = Number(this.state.controls.max.value);
        let error = null;
        if(min >= max){
            if(!error) {error = {label: 'flashcards.error.min_greater_equal_max', values: {}}};
        }
        
        if(max <= min){
            if(!error) {error = {label: 'flashcards.error.max_less_equal_min', values: {}}};
        }

        this.setState({formError: error});

        if(!error){
            return true;
        } else {
            return false;
        }
    }
    
    render() {
        let formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        formElementsArray.sort((a, b) => b.id.localeCompare(a.id));

        let html = null;

        if(this.state.isProcessing){
            html = <CircularProgress/>
        } else {
            if(!this.state.selectedFlashcards){
                html = (
                    <Paper style={{padding: 20, textAlign: 'center'}}>
                        <h1><FormattedMessage id="flashcards.title" /></h1>
                        <p><FormattedMessage id="flashcards.description" /></p>
                        <p style={{fontSize: '12px', color: 'red'}}>{this.state.formError ? <FormattedMessage id={this.state.formError.label} values={this.state.formError.values}/> : null}</p>
                        <form onSubmit={this.submitFormHandler}>
                            {formElementsArray.map((control, index) => (
                                <TextField
                                    key={control.id}
                                    id={control.id} 
                                    label={<FormattedMessage id={control.config.label} />}
                                    style={{width: '100px', height: '80px', margin: '15px 20px'}}
                                    type={control.config.type} 
                                    value={control.config.value}
                                    autoFocus={index === 0}
                                    onChange={(event) => this.inputChangedHandler(event, control.id)}
                                    inputProps={{min: control.config.validation.minNumber, max: control.config.validation.maxNumber}}
                                    error={control.config.touched && !control.config.validate.isValid}
                                    helperText={control.config.validate.error.label ? <FormattedMessage id={control.config.validate.error.label} values={control.config.validate.error.values} /> : null} 
                                    variant="outlined" />
                            ))}
                            <br/>
                            <Button variant="contained" color="primary" disabled={!this.state.formIsValid} type="submit" fullWidth style={{maxWidth: '325px'}}><FormattedMessage id="Go" /></Button>
                        </form>
                    </Paper>
                )
            } else {
                html = <FlashcardControls flashcards={this.state.selectedFlashcards} />
            }
        }
        
        return (
            <>{html}</>
        )
    }
}

const mapStateToProps = state => {
    return {
        flashcards: state.test,
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps)(Flashcards);