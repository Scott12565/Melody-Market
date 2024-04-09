import { createContext, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // sign Up
    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
            setCurrentUser(user);
          })
          .catch((error) => {
           
            const errorMessage = error.message;
            setError(errorMessage);
            console.log(error);
          });
    };

    // sign In
    const signIn = (email, password) => {

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);

    })
    .catch((error) => {
        const errorMessage = error.message;
            setError(errorMessage);
            console.log(error);
        });
    };

    const userSignOut = (auth) => {

        signOut(auth)
        .then(() => {
            setCurrentUser(null)
            console.log("successfully signed out");
        }).catch((error) => {
            console.log("failed to sign out: ", error);
        });
    }

    return ( 
        <AuthContext.Provider value={ {currentUser, signUp, signIn, userSignOut, loading, error} } >
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;