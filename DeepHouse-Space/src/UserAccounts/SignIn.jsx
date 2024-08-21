import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/firebaseContext";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import Loader from "../components/Loaders";
import { Helmet } from "react-helmet-async";
import { IoCloseOutline } from "react-icons/io5";

const SignIn = () => {
    const { currentUser, setCurrentUser, error } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const successMessage = queryParams.get('verified') === 'true' ? 'Your email has been verified. Please sign in.' : '';

    useEffect(() => {
        if (currentUser) {
            history.push('/'); // Redirect to home page if already signed in
        }
    }, [currentUser, history]);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            setErrorMessage('');
            const { signIn } = await import('../UserAccounts/index');
            await signIn(setCurrentUser, email, password);
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message || "Failed to sign in. Please check your credentials and try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        history.push('/'); // Redirect to home page
    };

    return (
        <>
            <Helmet>
                <title>DeepHouse Space - Sign In</title>
                <meta name="description" content="Sign in to DeepHouse Space to purchase your favorite deep house tracks." />
            </Helmet>
            {loading && <Loader />}
            <div className="flex flex-col fixed top-20 left-0 z-[110] bg-gray-800 opacity-95 w-full h-screen overflow-y-hidden overscroll-y-none">
                <div className="form-group bg-black shadow-lg rounded-2xl w-[95%] mt-12 mx-auto md:w-[65%] lg:w-[35%] md:mt-14 lg:mt-24">
                    <div className="flex justify-between items-center px-6 py-3">
                        <h1 className="text-2xl font-semibold text-gray-300">Sign In</h1>
                        <IoCloseOutline size={30} onClick={handleClose} className="text-white cursor-pointer" />
                    </div>
                    <form className="form-control w-[90%] mx-auto my-3 mb-0 px-4 py-3 pb-1" onSubmit={handleSignIn}>
                        {errorMessage && (
                            <div className="text-red-400 text-[1rem] py-[1px] w-[98%] mx-auto my-1">
                                {errorMessage}
                            </div>
                        )}
                        {successMessage && (
                            <div className="text-green-400 text-[1rem] py-[1px] w-[98%] mx-auto my-1">
                                {successMessage}
                            </div>
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
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter Password..." 
                            required 
                            className="input-field" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Link to="/resetpassword" className="block text-end text-blue-600 py-3 pt-0 text-lg hover:underline">Forgot password?</Link>
                        <button className="btn cursor-pointer hover:bg-gray-500 hover:text-gray-100 font-semibold mb-2">
                            Sign In
                        </button>
                    </form>
                    <p className="text-gray-300 text-center text-[16px] py-2 pb-4">
                        Don't have an account? 
                        <Link to="/signup" className="text-blue-500 hover:underline"> Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default SignIn;
