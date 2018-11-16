import * as actionTypes from './actionTypes';
import firebase from '../../firebase';

export const loadAppData = () => {
    return dispatch => {
        dispatch(loadAppDataStart());
        const locale = localStorage.getItem("locale");
        const itemsRef = firebase.database().ref(locale);
        itemsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            
            let prayers = [];
            for (let id in data.prayers) {
                prayers.push({
                    id: data.prayers[id].id,
                    title: data.prayers[id].title,
                    body: data.prayers[id].body
                });
            }

            let test = [];
            for (let id in data.test) {
                test.push({
                    id: data.test[id].id,
                    answer: data.test[id].answer,
                    question: data.test[id].question
                });
            }

            dispatch(loadAppDataSuccess(prayers, test));
        }, (error) => {
            console.log(error);
            dispatch(loadAppDataError(error));
        });
    }
}

const loadAppDataStart = () => {
    console.log("LOADING APP DATA");
    return {
        type: actionTypes.LOAD_APP_DATA_START
    }
}

const loadAppDataSuccess = (prayers, test) => {
    return {
        type: actionTypes.LOAD_APP_DATA_SUCCESS,
        prayers: prayers,
        test: test
    }
}

const loadAppDataError = (error) => {
    return {
        type: actionTypes.LOAD_APP_DATA_FAIL,
        error: error
    }
}