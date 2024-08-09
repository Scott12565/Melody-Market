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
            await sendEmailVerification(user);
            alert('Please verify your account before you continue!')
            setCurrentUser(user);
        } catch (err) {
            alert(err.message);
        }
    };

    // Sign In
    const signIn = async (setCurrentUser, email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user;
            if(!user.emailVerified){
                setCurrentUser(user);
                alert('Please verify your email');
            }
        } catch (err) {
            console.log('Invalid Email or Password');
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