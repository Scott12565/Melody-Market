import { useState, useContext } from "react";
import { AuthContext } from "../context/firebaseContext";


const PasswordReset = () => {
    const { passwordReset } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const handleReset = async (e) => {
        e.preventDefault();

        try {
            await passwordReset(email);
            setEmail('');
        } catch (error) {
            console.log('failed to send email:', error);
        };
    };

    return ( 
        <div className="flex flex-col items-center justify-center my-28">
            <div className="form-group bg-gray-800 shadow-lg rounded-2xl w-[45%]"> 
                <h1 className="text-2xl font-semibold text-gray-300 text-start py-3 pb-1 pt-6 px-9">Reset Password!</h1>
                    
                <form onSubmit={handleReset} className="form-control w-11/12 mx-auto my-3 mb-0 px-4 py-3 ">
                    <label htmlFor="email" className="" >Enter Email</label>
                    <input 
                        type="email" 
                        required 
                        placeholder="Enter Email...." 
                        className="input-field"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button className="btn cursor-pointer hover:bg-gray-500 hover:text-gray-100 font-semibold mb-2">Reset</button>
                </form>
            </div>
        </div>
     );
}
 
export default PasswordReset;