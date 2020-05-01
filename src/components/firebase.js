import firebase from 'firebase/app';
import 'firebase/database';


  const firebaseConfig = {
    apiKey: "AIzaSyDGehOXzZLBnpMnP5u1kG528ol92JlgoXA",
    authDomain: "new-shopping-cart-b228f.firebaseapp.com",
    databaseURL: "https://new-shopping-cart-b228f.firebaseio.com",
    projectId: "new-shopping-cart-b228f",
    storageBucket: "new-shopping-cart-b228f.appspot.com",
    messagingSenderId: "642892692693",
    appId: "1:642892692693:web:cd5a3285525e12eca9f65c",
    measurementId: "G-6RNQNL6N00"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;