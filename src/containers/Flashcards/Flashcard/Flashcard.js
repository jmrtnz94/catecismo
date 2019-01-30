import React, { Component } from 'react';
import {Card, Grid} from '@material-ui/core';


import styles from './Flashcard.module.css';

class Flashcard extends Component {
    state = {
        xDown: null,
        yDown: null,
        newCard: false
    }

    componentDidUpdate(prevProps){
        if(this.props.flashcard.question !== prevProps.flashcard.question){
            this.setState({newCard: true});
        }
    }

    onTouchStartHandler = (event) => {
        const xDown = event.touches[0].clientX;                                      
        const yDown = event.touches[0].clientY;
        this.setState({xDown: xDown, yDown: yDown});
    }

    onTouchMoveHandler = (event) => {
        let xDown = this.state.xDown;
        let yDown = this.state.yDown;

        if (!xDown || !yDown) {
            return;
        }
    
        const xUp = event.touches[0].clientX;                                    
        const yUp = event.touches[0].clientY;
    
        const xDiff = xDown - xUp;
        const yDiff = yDown - yUp;
    
        if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
            if (xDiff > 0) {
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
        this.setState({xDown: null, yDown: null});
    }

    cardClicked = () => {
        this.props.cardClicked();
        if(this.state.newCard){ // reset value
            this.setState({newCard: false});
        }
    }

    render(){
        let card = styles['card'];
        if(this.props.showAnswer){
            card += ' '+ styles['apply-flip'];
        }

        let answer = null;
        if(!this.state.newCard){
            answer = this.props.flashcard.answer.map((line, i) => <span key={i}>{line}<br/></span>);
        }

        return (
            <div className={card}
                onClick={this.cardClicked}
                onTouchStart={(event) => this.onTouchStartHandler(event)} 
                onTouchMove={(event) => this.onTouchMoveHandler(event)}>
                <div className={styles['content']}>
                    <Card className={styles['card-front']}>
                         <Grid container justify="center" alignItems="center" className={styles['full-size']}>
                             <Grid item>
                                <h3 style={{margin: '0px 10px', textAlign: 'center'}}>
                                    {this.props.flashcard.question}
                                </h3>
                            </Grid>
                        </Grid>
                    </Card>
                    <Card className={styles['card-back']}>
                         <Grid container justify="center" alignItems="center" className={styles['full-size']}>
                            <Grid item>
                                <h4 style={{margin: '0px 10px', textAlign: 'center', fontStyle: 'italic', fontWeight: 'inherit'}}>
                                    {answer}
                                </h4>
                            </Grid>
                        </Grid>
                    </Card>
                </div>
            </div>
        );
    }
};

export default Flashcard;