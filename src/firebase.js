import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

let firebaseConfig = {
  apiKey: "AIzaSyACvrHEe6QECxeFgdw28q1VxjYSUaK-wBs",
  authDomain: "proyecto-prueba-5d824.firebaseapp.com",
  projectId: "proyecto-prueba-5d824",
  storageBucket: "proyecto-prueba-5d824.appspot.com",
  messagingSenderId: "49325110242",
  appId: "1:49325110242:web:0579704419d5b0c79affbb"
};
// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
// Exporta la funcionalidad de la base de datos
export const firestore = firebase.firestore();
// Exporta el paquete firebase para otros usos
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const loginConGoogle = () => auth.signInWithPopup(provider);
export const logout = () => auth.signOut();
export const getCurrentUser = () => {
  return auth.currentUser;
};
export default firebase;
//firebase.initializeApp(firebaseConfig);
// Exporta la funcionalidad de la base de datos
//export const firestore = firebase.firestore();
// Exporta el paquete firebase para otros usos
//export default firebase;
