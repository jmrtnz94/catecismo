export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};


export const validateInput = (value, rules) => {
    let isValid = true;

    if(!rules){ // protect against form elements that do no have validation rules.
        return true;
    }

    if(rules.required){
        isValid = value.trim() !== '' && isValid; // add isValid - cleaver way to make sure all rules are met
    }

    if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if(rules.isEmail) {
        const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        isValid = pattern.test(value) && isValid;
    }

    if(rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
}