import { auth } from "../firebase/firebase";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut, 
    sendPasswordResetEmail, 
    sendEmailVerification
} from "firebase/auth"; 
 
    // Sign Up
    const signUp = async (email, password, setCurrentUser) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
    
            // Send verification email
            await sendEmailVerification(user);
    
            alert('A verification email has been sent to your inbox. Please verify your account before continuing!');
    
            // Optionally sign the user out if they're logged in by default
            await signOut(auth);
        } catch (err) {
            alert(err.message);
        }
    };
    

    // Sign In
    // Sign In
const signIn = async (setCurrentUser, email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        if (!user.emailVerified) {
            setCurrentUser(null); // Clear the user if not verified
            throw new Error('Please verify your email before signing in.');
        }

        setCurrentUser(user);
    } catch (err) {
        throw new Error(err.message);
    }
};

    

    // Sign Out
    const userSignOut = async (setCurrentUser) => {
        try {
            await signOut(auth)
        } catch (err) {
            alert(err.message);
        }
    };

    // resetEmail
    const passwordReset = async email => {
        try {
            await sendPasswordResetEmail(auth, email)
            console.log('email sent');
        } catch (error) {
            alert('Check your email inbox for password reset link');
        } 
    }

    export { signUp, signIn, userSignOut, passwordReset }