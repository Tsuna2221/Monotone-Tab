import firebase from '../config/fbConfig'

const auth = firebase.auth()
const db = firebase.firestore();


const createNewPerson = (name, email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
            res.updateProfile({displayName: name, photoURL: null})
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

const storeNote = (name, body, uid) => {
    db.collection("person").doc(uid).collection('notes').add({
        body: {
            name: name,
            content: body
        }
    })
    .then(function(res) {
        console.log("Document written with ID: ", res);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export { createNewPerson, loginPerson, signOutPerson, storeNote };