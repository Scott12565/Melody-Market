import { useContext, useState } from "react";
import { AuthContext } from "../context/firebaseContext";
import { Link, Redirect } from "react-router-dom";

const SignUp = () => {
    const { currentUser, signUp } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
    
        // password check
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
    
        try {
            setError('');
            await signUp(email, password);
        } catch (error) {
            console.error("Error signing up:", error);
            setError("Failed to create an account. Please try again.");
        }
    };
    

    return ( 
        <div className="flex flex-col items-center justify-center my-20">
            <div className="form-group bg-gray-800 shadow-lg rounded-2xl w-[45%]">
                <h1 className="text-2xl font-semibold text-gray-300 text-start py-3 pb-1 pt-6 px-9">Sign Up</h1>
                
                {/* Error message display */}
                {error && (
                    <div className="bg-red-500 text-xl text-black p-4 w-11/12 mx-auto my-4">
                        {error}
                    </div>
                )}

                <form className="form-control w-11/12 mx-auto my-3 mb-0 px-4 py-3" onSubmit={handleSignUp}>
                    <label htmlFor="name">Email</label>
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

                {/* Redirect if account is created successfully */}
                {currentUser && <Redirect to="/" />}

                {/* Create or forgot Password */}
                <p className="text-gray-300 text-center text-[16px] py-2 pb-4">
                    Already have an account? <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
                </p>
            </div>
        </div>
    );
}
 
export default SignUp;
