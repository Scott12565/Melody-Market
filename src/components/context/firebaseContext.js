import { createContext, useState } from "react";
import { auth} from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    // signup
    const signUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            
            const user = userCredential.user;
            setCurrentUser(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setError(errorMessage);
        });
    }

    return ( 
        <AuthContext.Provider value={ {currentUser, signUp, loading, error} } >
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;