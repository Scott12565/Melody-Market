import { useContext, useState } from "react";
import { AuthContext } from "../context/firebaseContext";

const SignUp = () => {
    const { currentUser, signUp } = useContext(AuthContext);
    const [user, setUser] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            setError('');
            await signUp(email, password);
            setUser(currentUser)
        } catch (error) {
            setError(error.message);
        }
    };

    return ( 
        <div className="flex justify-center items-center my-36 w-[500px] mx-auto text-xl text-gray-300">
            {error && <div className="text-red-500 text-xl text-center">{error}</div>}
            {user && (
                <div>{console.log(user)}</div>
            )}
            <form className="form-group" onSubmit={handleSignUp}>
                <input 
                    type="email" 
                    required 
                    placeholder="Enter Email...." 
                    className="px-3 block text-black"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Enter Password..." 
                    required 
                    className="px-2 my-3 block text-black" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="bg-blue-500 font-semibold p-1.5 cursor-pointer">Sign Up</button>
            </form>
        </div>
    );
}
 
export default SignUp;
