const validateUser = (input) => {
    if(input && input.length > 4 && !input.includes(' ')){
        return true
    }else if(input.length < 5){
        return false
    }else if(input.includes(' ')){
        return false
    }
}

const validateEmail = (email) => {
    // eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true
    }else{
        return false
    }
}

const validatePassword = (pass, confirm) => {
    if(pass === confirm){
        if(pass.length > 7){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}

const checkIfNotNull = (name, body) => {
    if(name !== undefined){
        if(name !== ''){
            if(body !== undefined){
                if(body !== ''){
                    return true
                }else{
                    return false
                }
            }else{
                return false
            }
        }else{
            return false
        }
    }else{
        return false
    }
}

const validateLinks = (name, url, color) => {
    if(name && url && color){
        if(name !== '' && url !== '' && url !== ''){
            return true
        }else{
            return false
        }
    }else{
        return false
    }
}

export { validateUser, validateEmail, validatePassword, checkIfNotNull, validateLinks };

