import $ from 'jquery'

const randString = (length) => {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var randomstring = ''

    for (var i = 0; i < length; i++) {
        var char = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(char,char+1);
    }

    return randomstring
}

const hideModal = (obj, event) => {
    var { prefix, element, button } = obj
    var p = prefix
    var e = document.querySelector(element)
    var i = document.querySelector('.' + prefix)
    var b = document.querySelector(button)

    if (!i && event.target !== b && !event.target.closest(element)){
        e.classList.toggle(p)
    };
}

const setCustomTheme = () => {
    /*Background*/
    if(document.querySelector(".t-dtc")){
        document.querySelector(".t-dtc").style.backgroundColor = localStorage.getItem('t-background')
    }

    $("[class*='custom']").each((i, el) => {
        if(el.className.includes("custom-t-background")){
            el.style.backgroundColor = localStorage.getItem('t-header')
        }else 
        
        if(el.className.includes("custom-t-btn-w")){
            //el.style.backgroundColor = localStorage.getItem('t-modal-button')
        }else 
        
        if(el.className.includes("custom-t-button-w")){
            el.style.borderColor = localStorage.getItem('t-general-button')
            el.style.color = localStorage.getItem('t-general-button')
        }else 
        
        if(el.className.includes("custom-t-modal")){
            el.style.backgroundColor = localStorage.getItem('t-modal')
        }else  
        
        if(el.className.includes("custom-t-text-w")){
            el.style.color = localStorage.getItem('t-text')
        }
    })
}

// $("[class*='custom']").each((i, el) => {
//     if(document.querySelector(".custom-t-body-bg")){
//         el.style.backgroundColor = localStorage.getItem('t-background')
//     }
// })

export {randString, hideModal, setCustomTheme}
