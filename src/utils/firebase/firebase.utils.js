import { initializeApp } from 'firebase/app';

import {
    getAuth,
    signWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAPe8xqxxBHgx9CDMsRGO-6KEFE3yUrz4w",
    authDomain: "crwn-clothing-db-58798.firebaseapp.com",
    projectId: "crwn-clothing-db-58798",
    storageBucket: "crwn-clothing-db-58798.appspot.com",
    messagingSenderId: "296387800040",
    appId: "1:296387800040:web:3c0e75e465c8368c52925d"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;

};