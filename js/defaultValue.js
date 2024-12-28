function defaultValue(value, defaultValue) {
    if(typeof value === 'undefined' || value === null){
        return defaultValue;
    }else{
        return value;
    }
}

export default defaultValue;