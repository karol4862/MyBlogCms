import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyAsbYHPbriab0V0EytaQZGzn8OGA4eGJ3c",
    authDomain: "my-first-firebase-63a81.firebaseapp.com",
    databaseURL: "https://my-first-firebase-63a81.firebaseio.com",
    projectId: "my-first-firebase-63a81",
    storageBucket: "my-first-firebase-63a81.appspot.com",
    messagingSenderId: "137991392462",
    appId: "1:137991392462:web:4f4a248cb6de5a06"
  };

class Firebase {
    constructor(){
        app.initializeApp(config);
        this.db = app.firestore()
        this.auth = app.auth();
        this.storage = app.storage();
    }
    

    addToDatabase = obj => 
    this.db.collection('project').add(obj);

    getFromDatabase = () => 
    this.db.collection('project').get();

    deleteFromDatabase = id => 
    this.db.collection('project').doc(id).delete();

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();
    getUser = () => this.auth.currentUser;

    sendImage = (name, file) => this.storage.ref().child(`image/${name}`).put(file);

    getImage = name => this.storage.ref().child(`image/${name}`).getDownloadURL();

    removeImage = name => this.storage.ref().child(`image/${name}`).delete();
}
export default Firebase;