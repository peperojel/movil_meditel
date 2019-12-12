import firebase from 'firebase';


class FireBases {
    constructor() {
        this.init();
        this.observeAuth();
      }
    init = () =>
      firebase.initializeApp({
        apiKey: "AIzaSyC9dcHWkWpcPtGiVbMywqqGgOpd9T1TpQk",
        authDomain: "chat-meditel.firebaseapp.com",
        databaseURL: "https://chat-meditel.firebaseio.com",
        projectId: "chat-meditel",
        storageBucket: "chat-meditel.appspot.com",
        messagingSenderId: "872137204566",
        appId: "1:872137204566:web:5c827fe821418188"
      });

      observeAuth = () =>
      firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

      onAuthStateChanged = user => {
        if (!user) {
          try {
            firebase.auth().signInAnonymously();
          } catch ({ message }) {
            alert(message);
          }
        }
      };
      get uid() {
        return (firebase.auth().currentUser || {}).uid;
      }
    
      get ref() {
        return firebase.database().ref('messages');
      }
      parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;
        const timestamp = new Date(numberStamp);
        const message = {
          _id,
          timestamp,
          text,
          user,
        };
        return message;
      };
      on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
      }
    send = messages => {
        for (let i = 0; i < messages.length; i++) {
          const { text, user } = messages[i];
          const message = {
            text,
            user,
            timestamp: this.timestamp,
          };
          this.append(message);
        }
      };
      append = message => this.ref.push(message);
      off() {
        this.ref.off();
      }
    }
    FireBases.shared = new FireBases();
    export default FireBases;