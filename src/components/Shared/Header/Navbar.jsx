import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Navbar = () => {
    return ( 

        // header start
        <header className="px-2.5 bg-gray-800 flex justify-between items-center mx-auto h-20 w-full " >
            <div className="flex justify-between items-center py-5 w-full md:w-[93%] md:mx-auto lg:w-10/12 lg:mx-auto">

                <div id="brand" className="p1 md:pl-1.5 lg:p-2">
                    {/* Brand name */}
                    <h3 className="flex items-center">
                        <Link to="/home" className=" md:text-[18px] font-bold text-yellow-300 "> DeepHouse Space </Link>
                            
                    </h3>
                </div>
                
                {/* navigations */}
                <nav className="flex items-center">
                    
                    <div className="nav-links justify-between flex items-center space-x-3 md:space-x-5 md:text-lg">
                        {/* search-bar */}
                        <div className="search-song flex justify-between items-center space-x-3 md:space-x-5">
                            <div className="flex items-center border border-gray-700 rounded-2xl">
                                <input type="text" className="hidden md:block text-sm h-full bg-transparent text-gray-300 md:text-lg font-lg px-3 rounded-l-2xl outline-none" placeholder="Search song here..." />
                                <button className="h-full p-1 text-xl text-gray-300 rounded-r-2xl hover:bg-gray-600 md:text-3xl">
                                    <LuSearch color="" />
                                </button>
                            </div>

                            <Link className="text-2xl relative text-gray-300 hover:bg-slate-700 hover:bg-gray-200 hover:rounded-full md:p-2 md:text-3xl">
                                <div>
                                <HiOutlineShoppingBag color="" className="relative"/>
                                <span className="absolute text-xl -top-3  -right-[.20rem] p-[.15rem] rounded-full text-yellow-300 md:-top-1 md:-right-[0.001rem] ">0</span>
                                </div>
                            </Link>
                        </div>
                        {/* SignUpSignIn Links */}
                        <Link to="/signup"  className="text-gray-300 hover:bg-slate-700 hover:bg-gray-200 md:hover:rounded-lg md:p-1.5">Sign Up</Link>
                        <Link to="/signin" className="text-gray-300 hover:bg-slate-700 hover:bg-gray-200 md:hover:rounded-lg md:p-1.5">Log In</Link>
                        
                    </div>
                </nav>
            </div>           
        </header>
        
     );
}
 
export default Navbar;