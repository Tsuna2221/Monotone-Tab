import firebase from '../config/fbConfig'
import {randString} from './general'

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
    var currentTime = new Date().getTime();

    db.collection("person").doc(uid).collection('notes').add({
        name: name,
        content: body,
        id: randString(5),
        createdAt: Math.round(currentTime / 1000)
    })
    .then(function(res) {
        console.log("Document written with ID: ", res);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

const exportBackup = (storage) => {
    db.collection("person").doc(auth.currentUser.uid).set({
        backup: JSON.stringify(storage)
    })
    .then(function(res) {
        console.log("Document written with ID: ", res);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

const importBackup = (update) => {
    db.collection("person").doc(auth.currentUser.uid).get().then(res => {
        var items = JSON.parse(res.data().backup)
        
        for (var key in items) {
            localStorage.setItem(key, items[key])
        }

        return res
    })
    .then(() => update())
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}

export { createNewPerson, loginPerson, signOutPerson, storeNote, exportBackup, importBackup };