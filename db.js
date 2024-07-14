const { initializeApp } = require('firebase/app');
const admin = require('firebase-admin')
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const config = require('./config');

const app = initializeApp(config.firebaseConfig);
const firestore = getFirestore(app);

module.exports = {
    firestore: firestore,
    doc: doc,
    setDoc: setDoc
};