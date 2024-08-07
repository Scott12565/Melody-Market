import { useState, useContext } from "react";
import { AuthContext } from "../context/firebaseContext";

const PasswordReset = ({ closePasswordReset }) => {
    const { error } = useContext(AuthContext);
    const [email, setEmail] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const { passwordReset } = await import('../UserAccounts/index');
            passwordReset(email);
            setEmail('');
            closePasswordReset();
        } catch (error) {
            console.log('failed to send email:', error);
        }
    };

    return (
        <div className="flex flex-col fixed top-20 left-0 z-[110] bg-gray-800 opacity-95 w-full h-screen overflow-y-hidden overscroll-y-none">
            <div className="form-group bg-black shadow-lg rounded-2xl w-[95%] mt-12 mx-auto md:w-[65%] lg:w-[35%] md:mt-14 lg:mt-24">
                <h1 className="text-2xl font-semibold text-gray-300 text-start py-3 pb-0 pt-6 px-9">Reset Password</h1>
                <form onSubmit={handleReset} className="form-control w-[90%] mx-auto my-3 mb-0 px-4 py-3 pb-1">
                    {error && (
                        <div className="text-red-400 text-[1rem] py-[1px] w-[98%] mx-auto my-1">{error}</div>
                    )}
                    <label htmlFor="email">Enter Email</label>
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
