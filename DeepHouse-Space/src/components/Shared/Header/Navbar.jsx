import { Link, useLocation, useHistory } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { VscSignOut } from "react-icons/vsc";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/firebaseContext";
import { auth } from "../../../firebase/firebase";
import { SongContext } from "../../../context/songContext";
import HoverCart from "../../../Pages/cart/HoverCart";
import { cartContext } from "../../../context/CartContext";

const Navbar = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const { showSideBar, allSongs, setFilteredSongs, handleSideBar } = useContext(SongContext);
    const { musicItems } = useContext(cartContext);

    const location = useLocation();
    const history = useHistory();
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    const handleSearch = async (e) => {
        try {
            setSearchInput(e.target.value);
            const { searchSongs } = await import('../../../index');
            searchSongs(allSongs, setFilteredSongs, e.target.value);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            const { userSignOut } = await import('../../../UserAccounts/index');
            await userSignOut(auth, setCurrentUser);
            history.push("/signin");
        } catch (error) {
            setError(`Failed to sign out: ${error}`);
            console.log(error);
        }
    };

    const handleSignUp = () => {
        history.push("/signup");
    };

    const handleSignIn = () => {
        history.push("/signin");
    };

    const toggleSearch = () => {
        setIsSearchExpanded(!isSearchExpanded);
    };

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
                            {currentUser ? (
                                <>
                                    {location.pathname !== "/signup" && location.pathname !== "/signin" && (
                                        <div className="relative h-full">
                                            <div className={`flex items-center justify-end border border-gray-700 rounded-2xl ${isSearchExpanded ? 'w-[190px]' : ''} h-full text-lg overflow-hidden transition-width duration-500`}>
                                                <input type="text" className={`text-sm text-gray-300 w-full h-8 bg-transparent md:text-lg font-lg px-3 rounded-l-2xl outline-none ${isSearchExpanded ? 'block' : 'hidden lg:block'}`} value={searchInput} placeholder="Search song here..." onChange={handleSearch} />
                                                <button className="h-full p-1 text-xl text-gray-300 rounded-r-2xl hover:bg-gray-600 md:text-3xl" onClick={toggleSearch}>
                                                    <LuSearch size={25} color="" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="hover-cart group text-2xl relative text-gray-300 hover:bg-slate-700 hover:bg-gray-200 relative hover:rounded-full md:p-2 md:text-3xl">
                                        <Link to="/collection">
                                            <div>
                                                <HiOutlineShoppingBag color="" className="relative"/>
                                                <span className="absolute text-xl -top-3 -right-[.20rem] p-[.15rem] rounded-full text-yellow-300 md:-top-1 md:-right-[0.001rem]">{musicItems.length}</span>
                                            </div>
                                        </Link>
                                        <div className="cart-hover hidden w-60 h-[250px] my-7 bg-gray-800 opacity-0 transition duration-700 transform absolute translate-x-5 invisible rounded-md shadow-xl group-hover:opacity-95 group-hover:-translate-x-2 group-hover:visible group-hover:delay-300 lg:block hover:bg-gray-800">
                                            <HoverCart />
                                        </div>
                                    </div>

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
                                        <span onClick={handleSignUp} className="text-gray-300 hover:bg-slate-700 hover:bg-gray-200 md:hover:rounded-lg md:p-1.5 cursor-pointer">Sign Up</span>
                                    )}
                                    {location.pathname !== "/signin" && (
                                        <span onClick={handleSignIn} className="text-gray-300 hover:bg-slate-700 hover:bg-gray-200 md:hover:rounded-lg md:p-1.5 cursor-pointer">Log In</span>
                                    )}
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Navbar;
