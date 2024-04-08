import { useContext, useState } from "react";
import { AuthContext } from "../context/firebaseContext";
import { Link, Redirect } from "react-router-dom";

const SignIn = () => {
    const { currentUser, signIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        
        try {
            setError('');
            await signIn(email, password);
            } catch (error) {
                console.error("Error signing up:", error);
                
                setError("Failed to sign in. Please check your credentials and try again.");
            }
    };

    return ( 
        <div className="flex flex-col items-center justify-center my-28 ">
            
        <div className="form-group bg-gray-800 shadow-lg rounded-2xl w-[45%] ">
            <h1 className="text-2xl font-semibold text-gray-300 text-start py-3 pb-1 pt-6 px-9">Sign In</h1>
            
            {error && <div className="text-red-500 text-xl text-center">{error}</div>}
            {currentUser && (
                <div>{console.log(currentUser)}</div>
            )}
            <form className="form-control w-11/12 mx-auto my-3 mb-0 px-4 py-3" onSubmit={handleSignIn}>
                
                <label htmlFor="email" className="">Email</label>
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
                    onChange={ e => setPassword(e.target.value)}
                />

                <Link to="/passwordreset" className="block text-end text-blue-600 py-3 pt-0 text-lg hover:underline" >forgot password</Link>
                <button className="btn cursor-pointer hover:bg-gray-500 hover:text-gray-100 font-semibold mb-2">Sign In</button>

            </form>

            {currentUser && <Redirect path="/" />}
            {/* create or forgot Password */}
            <p className="text-gray-300 text-center text-[16px] py-2 pb-4">Don't have an account? <Link to="/signup" >Sign Up</Link></p>
        </div>
    </div>
     );
}
 
export default SignIn;