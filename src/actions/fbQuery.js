import firebase from '../config/fbConfig'
const auth = firebase.auth()

const createNewPerson = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

const loginPerson = (email, password) => {
    auth.signInWithEmailAndPassword(email, password)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}

const signOutPerson = () => {
    auth.signOut().then(function() {
        console.log('user logged out')
    }).catch(function(err) {
        console.log(err)
    });
}


// const getPerson = () => {
//     var db = firebase.firestore();

//     db.collection("users").get().then((query) => {
//         query.forEach((doc) => {
//             console.log(doc.id, doc.data());
//         });
//     });   
// }

// const storePerson = (name, email, password) => {
//     var db = firebase.firestore();

//     db.collection("person").add({
//         name: name,
//         email: email,
//         password: password
//     })
//     .then(function(res) {
//         console.log("Document written with ID: ", res.id);
//     })
//     .catch(function(error) {
//         console.error("Error adding document: ", error);
//     });
// }

export { createNewPerson, loginPerson, signOutPerson };