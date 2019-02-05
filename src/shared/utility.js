export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};


export const validateInput = (value, rules) => {
    let isValid = true;
    let error = '';

    if(!rules){ // protect against form elements that do no have validation rules.
        return {valid: true, error: ''};
    }

    if(rules.required){
        isValid = value.trim() !== '' && isValid;
        if(!isValid && !error) {error = {label: "error.required", values: {}}};
    }

    if(rules.isEmail) {
        const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        isValid = pattern.test(value) && isValid;
        if(!isValid && !error) {error = {label: "error.email", values: {}}};
    }

    if(rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
        if(!isValid && !error) {error = {label: "error.numeric", values: {}}};
    }

    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
        if(!isValid && !error) {error = {label: "error.minLength", values: {min: rules.minLength}}};
    }

    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
        if(!isValid && !error) {error = {label: "error.maxLength", values: {max: rules.maxLength}}};
    }

    if(rules.minNumber) {
        isValid = value >= rules.minNumber && isValid;
        if(!isValid && !error) {error = {label: "error.minValue", values: {min: rules.minNumber}}};
    }

    if(rules.maxNumber) {
        isValid = value <= rules.maxNumber && isValid;
        if(!isValid && !error) {error = {label: "error.maxValue", values: {max: rules.maxNumber}}};
    }

    return {isValid: isValid, error: error};
}