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
        if(this.props.question !== prevProps.question){
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
        let innerCard = styles['flip-card'];
        if(this.props.showAnswer){
            innerCard += ' '+ styles.flip;
        }

        return (
            <div className={styles['flip-card-container']}
                onClick={this.cardClicked}
                onTouchStart={(event) => this.onTouchStartHandler(event)} 
                onTouchMove={(event) => this.onTouchMoveHandler(event)}>
                <div className={innerCard}> 
                    <Card className={styles['flip-card-front'] + ' ' + styles['full-size']}>
                        <Grid container justify="center" alignItems="center" className={styles['full-size']}>
                            <Grid item>
                                <h3 style={{margin: '0px 10px'}}>
                                    {this.props.question}
                                </h3>
                            </Grid>
                        </Grid>
                    </Card>
                    
                    <Card className={styles['flip-card-back'] + ' ' + styles['full-size']}>
                        <Grid container justify="center" alignItems="center" className={styles['full-size']}>
                            <Grid item>
                                <h4 style={{margin: '0px 10px', fontStyle: 'italic', fontWeight: 'inherit', visibility: this.state.newCard ? 'hidden' : 'visible'}}>
                                    {this.props.answer.map((line, i) => <span key={i}>{line}<br/></span>)}
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