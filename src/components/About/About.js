import React, { Component } from 'react';

import {Paper, Divider} from '@material-ui/core';

class About extends Component {
    
    componentDidMount() {
        this.loadLinkedInScrip();
    }

    componentDidUpdate() {
        this.loadLinkedInScrip();
    }

    loadLinkedInScrip = () =>{
        const script = document.createElement("script");
        script.src = "https://platform.linkedin.com/badges/js/profile.js";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }

    render() {
        return (
            <Paper style={{padding: 20}}>
                <div style={{width: '280px', marginLeft: 'auto', marginRight: 'auto'}} className="LI-profile-badge" data-version="v1" data-size="medium" data-locale="en_US" data-type="horizontal" data-theme="light" data-vanity="jose-martinez-617660b3">
                    <a className="LI-simple-link" href='https://www.linkedin.com/in/jose-martinez-617660b3?trk=profile-badge'>Jose Martinez</a>
                </div>

                <h2>Background: <Divider /></h2>
                <p>
                    Recently, I became interested in learning a new front-end framework/library like Angular, 
                    Vue, and React. Ultimately, I was drawn to React and decided to take an online course on 
                    the library. This course taught me many valuable skills that I wanted to expand on. I wanted 
                    to prove to myself that I understood React. I knew I needed to build my own web app but I 
                    wasn’t sure what I wanted to build.
                </p>
                <p>
                    My girlfriend teaches Catechism at our church. These classes prepare children to receive their 
                    sacraments. Some of the learning requirements include prayers, the 92 questions, and important 
                    information like The 10 Commandments. The children receive a book which contains all this information. 
                    The book is very small and easy to lose and tear, which these kids usually do. After listening to her 
                    talk about her students and visiting a couple of times, I started wondering how I could help them become 
                    more interested and help them learn. Kids these days are pretty tech savvy and sometimes know how to use 
                    a phone better than their parents. That's when I found something useful I could create with React. I 
                    decided to create a web app that contained the information their book had.
                </p>

                <h2>Technical Side: <Divider /></h2>
                <p>
                    I used React to create my web app. React router was used to parse the url and load the required 
                    component(s). I used React Redux to store database values and language settings when the app loads. 
                    Redux thunk was required to fetch information from the database while using a Redux action. The 
                    children learn in English and Spanish, which made it a requirement to incorporate both these languages. 
                    I used React Intl for this. The database I decided to go with is Firebase. I installed the firebase 
                    library so I could use the firebase component to easily connect to my firebase database. I could have 
                    used axios, which is what I used in the course I took. My web app does not have a large amount of data 
                    nor does the data change often, so I could have just stored everything local but I wanted to show that 
                    I could fetch data from a server as well. Material UI was used to save some time on styling my web app.
                </p>

                <h2>Database Structure: <Divider /></h2>
                <ul>
                    <li>database
                        <ul>
                            <li>en (English)
                                <ul>
                                    <li>prayers</li>
                                    <li>test (questions)</li>
                                </ul>
                            </li>
                            <li>es (Spanish)
                                <ul>
                                    <li>prayers</li>
                                    <li>test (questions)</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                </ul>

                <h2>App Loading: <Divider /></h2>
                <p>
                    When the web app initializes in your browser, it checks to see if you have visited the site before. 
                    If you haven't it sets the app language to English and stores it in the browser's local storage. 
                    If you have, it gets the language from your previous visit. The next thing that happens is the 
                    data from the database is loaded and stored locally. I pass the user’s selected language and pull 
                    all the data from that section (prayers and test) and store it locally. Firebase is a free database 
                    service as long as you don't pass certain limits, one of them being database connections. To keep them 
                    at a minimum I decided to load all data at the beginning and store a copy locally. Refreshing the 
                    page, opening the web app in a new tab, or when changing the language preference are times when a 
                    new database connection would be opened up to refresh the local data.
                </p>

                <h2>Libraries: <Divider /></h2>
                <ul>
                    <li>react - for SPA Development</li>
                    <li>react-router-dom - for Routing</li>
                    <li>redux, react-redux - for Application Storage</li>
                    <li>redux-thunk - for Asynchronous Actions</li>
                    <li>react-intl - for Internationalize</li>
                    <li>firebase - for Database Storage</li>
                    <li>material-ui - for Styling and Icons</li>
                </ul>
            </Paper>
        );
    }
};

export default About;