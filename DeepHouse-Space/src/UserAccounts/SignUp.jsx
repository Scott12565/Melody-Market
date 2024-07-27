import { useContext, useState } from "react";
import { AuthContext } from "../context/firebaseContext";
import { Link, Redirect } from "react-router-dom";
import Loader from "../components/Loaders";
import { Helmet } from "react-helmet-async";

const SignUp = ({ closeSignUp }) => {
    const { currentUser, setCurrentUser, error } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        } else if (password.length < 8) {
            setErrorMessage('Password is too short, it should be 8 characters or longer');
            return;
        } else {
            setErrorMessage(null);
        }
        setLoading(true);
        try {
            const { signUp } = await import('../UserAccounts/index');
            await signUp(email, password, setCurrentUser);
            closeSignUp();
        } catch (error) {
            console.log(error);
            setErrorMessage("Failed to sign up. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>DeepHouse Space - Sign Up</title>
                <meta name="description" content="Sign up for DeepHouse Space account to start purchasing and enjoying your favorite deep house tracks. Join our community of music lovers today!" />
                <meta name="keywords" content="deep house music, deephouse space, sign up, register, deep house space, music store" />
                <meta property="og:title" content="DeepHouse Space - Sign Up" />
                <meta property="og:description" content="Sign up for DeepHouse Space account to start purchasing and enjoying your favorite deep house tracks. Join our community of music lovers today!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.deephousespace.com/signup" />
            </Helmet>
            {loading && <Loader />} {/* Show the loader if loading is true */}
            <div className="flex flex-col fixed top-20 left-0 z-[110] bg-gray-800 opacity-95 w-full h-screen overflow-y-hidden overscroll-y-none">
                <div className="form-group bg-black shadow-lg rounded-2xl w-[95%] mt-12 mx-auto md:w-[65%] lg:w-[35%] md:mt-14 lg:mt-24">
                    <h1 className="text-2xl font-semibold text-gray-300 text-start py-3 pb-0 pt-6 px-9">Sign Up</h1>
                    <form className="form-control w-[90%] mx-auto my-3 mb-0 px-4 py-3 pb-1" onSubmit={handleSignUp}>
                        {error && (
                            <div className="text-red-400 text-[1rem] py-[1px] w-[98%] mx-auto my-1">{error}</div>
                        )}
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            required 
                            placeholder="Enter Email...." 
                            className="input-field"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        {errorMessage && (
                            <div className="text-red-400 text-[1rem] py-[1px] w-[98%] mx-auto my-1">
                                {errorMessage}
                            </div>
                        )}
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter Password..." 
                            required 
                            className="input-field" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label htmlFor="passwordconfirm">Confirm Password</label>
                        <input 
                            type="password" 
                            placeholder="Confirm Password..." 
                            required 
                            className="input-field" 
                            value={confirmPassword} 
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <button className="btn cursor-pointer hover:bg-gray-500 hover:text-gray-100 font-semibold mb-2">Sign Up</button>
                    </form>
                    {currentUser && <Redirect to="/" />}
                    <p className="text-gray-300 text-center text-[16px] py-2 pb-4">
                        Already have an account? 
                        <Link to="/signin" className="text-blue-500 hover:underline"> Sign In</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignUp;
