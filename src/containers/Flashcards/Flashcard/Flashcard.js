import React, { Component } from 'react';
import {Card, Grid} from '@material-ui/core';


import styles from './Flashcard.module.css';

class Flashcard extends Component {
    state = {
        xDown: null,
        yDown: null
    }

    onTouchStartHandler = (event) => {
        const xDown = event.touches[0].clientX;                                      
        const yDown = event.touches[0].clientY;
        this.setState({xDown: xDown, yDown: yDown});
    }

    onTouchMoveHandler = (event) => {
        let xDown = this.state.xDown;
        let yDown = this.state.yDown;

        if ( ! xDown || ! yDown ) {
            return;
        }
    
        const xUp = event.touches[0].clientX;                                    
        const yUp = event.touches[0].clientY;
    
        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;
    
        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* left swipe */
                this.props.next();
            } else {
                /* right swipe */
                this.props.prev();
            }                       
        } 
        // else {
        //     if ( yDiff > 0 ) {
        //         /* up swipe */ 
        //         console.log("up swipe");
        //     } else { 
        //         /* down swipe */
        //         console.log("down swipe");
        //     }                                                                 
        // }

        /* reset values */
        xDown = null;
        yDown = null;

        this.setState({xDown: xDown, yDown: yDown});
    }

    render(){
        return (
            <Card style={{padding: 20, minHeight: '400px', height: '75vh'}} 
                onClick={this.props.cardClicked}
                onTouchStart={(event) => this.onTouchStartHandler(event)} 
                onTouchMove={(event) => this.onTouchMoveHandler(event)}>
                <Grid container style={{height: '48%', textAlign: 'center', fontSize: '2.75vh'}} justify='center' alignItems='center'>
                    <Grid item xs={12}>
                        <h2>{this.props.question}</h2>
                    </Grid>
                </Grid>
                <hr className={styles.hr} />
                <Grid container style={{height: '48%', textAlign: 'center', fontSize: '2vh'}} justify='center' alignItems='center'>
                    <Grid item xs={12}>
                        <p style={{visibility: this.props.showAnswer ? 'visible' : 'hidden'}}>
                            {this.props.answer.map(line => <>{line}<br/></>)}
                        </p>
                    </Grid>
                </Grid>
            </Card>
        );
    }
};

export default Flashcard;