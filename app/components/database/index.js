import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyBHLEIVdl1TJmkKIUnMd0wK2btfEhHaPno',
  authDomain: 'crud-f498f.firebaseapp.com',
  databaseURL: 'https://crud-f498f.firebaseio.com',
  projectId: 'crud-f498f',
  storageBucket: 'crud-f498f.appspot.com',
  messagingSenderId: '394266961959',
  appId: '1:394266961959:web:2d2d31747736abe76fc602',
};

firebase.initializeApp(firebaseConfig);
var fb=firebase.firestore();
export default firebase;

