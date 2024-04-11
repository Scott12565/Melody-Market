import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // observer... for state change.
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Sign Up
    const signUp = (email, password) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            setCurrentUser(user);
            setLoading(false);
          })
          .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
            setLoading(false);
          });
    };

    // Sign In
    const signIn = (email, password) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            setCurrentUser(user);
            setLoading(false);
        })
        .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
            setLoading(false);
        });
    };

    // Sign Out
    const userSignOut = () => {
        setLoading(true);
        signOut(auth)
        .then(() => {
            setCurrentUser(null);
            setLoading(false);
            console.log("Successfully signed out");
        }).catch((error) => {
            setError(error.message);
            setLoading(false);
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
            // ..
        });
    }

    // Set persistence
    // useEffect(() => {
    //     setPersistence(auth, browserLocalPersistence)
    //         .catch((error) => console.log("Failed to set persistence: ", error));
    // }, []);

    return ( 
        <AuthContext.Provider value={{ currentUser, signUp, signIn, userSignOut, passwordReset, loading, error }}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;
