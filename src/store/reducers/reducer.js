import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    prayers: null,
    test: null,
    isLoading: false,
    error: null
};

const loadAppDataStart = (state, action) => {
    return updateObject(state, {isLoading: true, error: null});
}

const loadAppDataSuccess = (state, action) => {
    return updateObject(state, {
        prayers: action.prayers,
        test: action.test,
        isLoading: false
    });
}

const loadAppDataFail = (state, action) => {
    return updateObject(state, {
        isLoading: false, 
        error: action.error
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOAD_APP_DATA_START:
            return loadAppDataStart(state, action);

        case actionTypes.LOAD_APP_DATA_SUCCESS:
            return loadAppDataSuccess(state, action);

        case actionTypes.LOAD_APP_DATA_FAIL:
            return loadAppDataFail(state, action);

        default:
            return state;
    }
};

export default reducer;