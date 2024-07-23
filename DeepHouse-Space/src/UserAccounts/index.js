import { auth } from "../firebase/firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut, 
    sendPasswordResetEmail 
} from "firebase/auth"; 
 
    // Sign Up
    const signUp = (email, password, setCurrentUser) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            setCurrentUser(user);
          }).catch((error) => {
            const errorMessage = error.message;
            setError('Email already exist, use different email', errorMessage);
          });
    };

    // Sign In
    const signIn = (setCurrentUser, email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setCurrentUser(user);
        })
        .catch((error) => {
            let errorMessage = error.message;
            errorMessage = 'Invalid Email or Password!'
            console.log(errorMessage)
        });
    };

    // Sign Out
    const userSignOut = (setCurrentUser) => {
        signOut(auth)
        .then(() => {
            setCurrentUser(null);
            console.log("Successfully signed out");
        }).catch((error) => {
            console.log("Failed to sign out: ", error);
        });
    };

    // resetEmail
    const passwordReset = email => {
        sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log('email sent');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    export { signUp, signIn, userSignOut, passwordReset }