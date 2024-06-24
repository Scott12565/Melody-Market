import { Link, useLocation } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoLogOutOutline } from "react-icons/io5";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/firebaseContext";
import { auth } from "../../../firebase/firebase";
import SignUp from "../../../UserAccounts/SignUp";
import SignIn from "../../../UserAccounts/SignIn";
import PasswordReset from "../../../UserAccounts/PasswordReset";
import { SongContext } from "../../../context/songContext";
import HoverCart from "../../../Pages/cart/HoverCart";
import { cartContext } from "../../../context/CartContext";


const Navbar = () => {
    const { currentUser, userSignOut } = useContext(AuthContext);
    const { showSideBar, handleSideBar } = useContext(SongContext);
    const { musicItems } = useContext(cartContext);

    const location = useLocation();
    const [error, setError] = useState(null);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const history = useHistory();

    const handleSignOut = async () => {
        try {
            await userSignOut(auth);
            history.push("/signin");
        } catch (error) {
            setError(`Failed to sign out: ${error}`);
            console.log(error);
        }
    }

    const signInSignUp = () => {
        setShowSignUp(true);
        setShowSignIn(false);
        setShowResetPassword(false);
    }

    const logInSignIn = () => {
        setShowSignIn(true);
        setShowSignUp(false);
        setShowResetPassword(false);
    }

    const forgotPassword = () => {
        setShowResetPassword(true);
        setShowSignIn(false);
        setShowSignUp(false);
    }

    const closeSignUp = () => {
        setShowSignUp(false);
    }

    const closeSignIn = () => {
        setShowSignIn(false);
    }

    const closeResetPassword = () => {
        setShowResetPassword(false);
    }

    return ( 
        <>
            {/* header */}
            <header className="px-2.5 bg-gray-800 flex justify-between items-center mx-auto h-20 w-full sticky top-0 z-50 lg:z-[100]">
                {error && <div>{error}</div>}
                <div className="flex justify-between items-center py-5 w-full md:w-[93%] md:mx-auto lg:w-10/12 lg:mx-auto">
                    <div id="brand" className="hidden lg:block p1 md:pl-1.5 lg:p-2">
                        <h3 className="flex items-center">
                            <Link to="/" className="md:text-[18px] font-bold text-yellow-300">DeepHouse Space</Link>
                        </h3>
                    </div>
                    
                    <div className="lg:hidden text-gray-300">
                        {showSideBar ? '' : (<AiOutlineMenuUnfold size={30} onClick={handleSideBar} />)}
                    </div>

                    <nav className="flex items-center">
                        <div className="nav-links justify-between flex items-center space-x-4 md:space-x-5 md:text-lg">
                            { currentUser ? (
                                <>
                                    { location.pathname !== "/signup" && location.pathname !== "/signin" && (
                                    <div className="search-song flex justify-between items-center space-x-3 md:space-x-5">
                                        <div className="flex items-center border border-gray-700 rounded-2xl">
                                            <input type="text" className="hidden md:block text-sm h-full bg-transparent text-gray-300 md:text-lg font-lg px-3 rounded-l-2xl outline-none" placeholder="Search song here..." />
                                            <button className="h-full p-1 text-xl text-gray-300 rounded-r-2xl hover:bg-gray-600 md:text-3xl">
                                                <LuSearch color="" />
                                            </button>
                                        </div>

                                        <div className="hover-cart group text-2xl relative text-gray-300 hover:bg-slate-700 hover:bg-gray-200 relative hover:rounded-full md:p-2 md:text-3xl">
                                            <Link to="/cart" >
                                                <div>
                                                    <HiOutlineShoppingBag color="" className="relative"/>
                                                    <span className="absolute text-xl -top-3 -right-[.20rem] p-[.15rem] rounded-full text-yellow-300 md:-top-1 md:-right-[0.001rem]">{musicItems.length}</span>
                                                </div>
                                            </Link>
                                            <div className="cart-hover hidden w-60 h-[250px] my-7 bg-gray-800 opacity-0 transition duration-300 transform absolute translate-x-5 invisible rounded-md shadow-xl group-hover:opacity-95 group-hover:-translate-x-2 group-hover:visible group-hover:delay-300 lg:block">
                                                <HoverCart />
                                            </div>
                                        </div>
                                    </div>
                                    )}

                                    <button onClick={handleSignOut} className="text-gray-300 hover:bg-slate-700 hover:bg-gray-200 md:hover:rounded-lg md:p-1.5">
                                        <div className="hidden inline lg:block">
                                            Sign Out
                                        </div>
                                        <VscSignOut className="text-3xl lg:hidden" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    {location.pathname !== "/signup" && (
                                        <span onClick={signInSignUp} className="text-gray-300 hover:bg-slate-700 hover:bg-gray-200 md:hover:rounded-lg md:p-1.5 cursor-pointer">Sign Up</span>
                                    )}
                                    {location.pathname !== "/signin" && (
                                        <span onClick={logInSignIn} className="text-gray-300 hover:bg-slate-700 hover:bg-gray-200 md:hover:rounded-lg md:p-1.5 cursor-pointer">Log In</span>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
            {showSignUp && <SignUp closeSignUp={closeSignUp} />}
            {showSignIn && <SignIn closeSignIn={closeSignIn} forgotPassword={forgotPassword} />}
            {showResetPassword && <PasswordReset closeResetPassword={closeResetPassword} />}
        </>
    );
}

export default Navbar;
