import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAaQYvtIpwU2PbzJyTFLhq61XeV5ZoBsaA",
    authDomain: "cristo-rey-catecismo.firebaseapp.com",
    databaseURL: "https://cristo-rey-catecismo.firebaseio.com",
    projectId: "cristo-rey-catecismo",
    storageBucket: "cristo-rey-catecismo.appspot.com",
    messagingSenderId: "752228192700"
};

firebase.initializeApp(config);

export default firebase;
