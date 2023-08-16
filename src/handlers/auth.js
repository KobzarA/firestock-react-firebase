import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase.config';

const provider = new GoogleAuthProvider();

const FirebaseAuth = {
  // signIn: async () => {
  //   try {
  //     return (await signInWithPopup(auth, provider)).user;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // signOut: () => {
  //   signOut(auth)
  //     .then(() => console.log('user logged out'))
  //     .catch(console.error);
  // },
  signIn: () => {
    return new Promise(resolve => {
      console.log('signIn');
      signInWithPopup(auth, provider)
        .then(response => {
          resolve(response.user);
        })
        .catch(console.error);
    });
  },
  signOut: () => {
    return new Promise(resolve => {
      console.log('signOut');

      signOut(auth)
        .then(() => {
          console.log('user logged out');
          resolve();
        })
        .catch(console.error);
    });
  },
  getCurrentUser: () => {
    console.log('getCurrentUser');
    return new Promise(resolve => {
      return auth.onAuthStateChanged(resolve);
    });
  },
};

export default FirebaseAuth;
