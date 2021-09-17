export const unslash = value => {
    let returnValue = value;
    while (returnValue.indexOf('/') === 0) {
        returnValue = returnValue.substr(1);
    }
    while (returnValue.length && returnValue.lastIndexOf('/') === returnValue.length - 1) {
        returnValue = returnValue.substring(0, returnValue.length - 1);
    }
    return returnValue;
};
