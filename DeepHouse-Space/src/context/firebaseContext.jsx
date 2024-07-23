import { createContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // observer... for state change.
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    return ( 
        <AuthContext.Provider value={{ currentUser, setCurrentUser, loading, error }}>
            {children}
        </AuthContext.Provider>
     );
}
 
export default AuthContextProvider;
