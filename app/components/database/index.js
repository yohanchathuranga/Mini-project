import firebase from 'firebase';

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
export default firebase;
