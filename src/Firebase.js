import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const config = {
    apiKey: "AIzaSyBJJVAR2_S6rTnmuAC_anBN6NV4OAdnd0I",
    authDomain: "web-sea-food.firebaseapp.com",
    databaseURL: "https://web-sea-food.firebaseio.com",
    projectId: "web-sea-food",
    storageBucket: "web-sea-food.appspot.com",
    messagingSenderId: "351172669160",
    appId: "1:351172669160:web:0977cc2504393e8eb6235d",
    measurementId: "G-T1M0SRF3MZ"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;