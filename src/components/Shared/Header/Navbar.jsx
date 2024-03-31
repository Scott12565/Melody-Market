import { LuMusic2, LuSearch } from "react-icons/lu";
import logo from "../../../assets/Logo/MelodyMarkets.png"
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Navbar = () => {
    return ( 

        // header start
        <header className="flex justify-between w-10/12 bg-darkLavender mx-auto py-3.5 " >
            {/* brand */}
            <div id="brand" className="pl-2">
                <h3 className="flex items-center">
                    <img src={logo} alt="Logo" className="w-[150px] "/>
                    {/* <LuMusic2 size={30} color="dodgeblue" />
                    <span className="font-sm font-bold text-black ">MelodyMarket</span> */}
                </h3>
            </div>
            {/* search-bar */}
            <div className="search-song">
                <div className="flex items-center border border-gray-800 rounded-2xl w-60 h-9 ">
                    <input type="text" className="h-full bg-transparent w-[200px] text-gray-800 text-lg font-lg px-3 rounded-s-2xl outline-none " placeholder="search song here..." />
                    <span className="cursor-pointer h-full rounded-e-2xl p-1 text-gray-800 w-[50px] ">
                        <LuSearch  size={25} color="dodgeblue"/>
                    </span>
                </div>
            </div>
            {/* navigations */}
            <nav className="flex">
                <div className="nav-links flex items-center px-5 text-orange-600  ">
                    <a href="" className="SignUpSignIn">Sign Up</a>
                    <a href="" className="SignUpSignIn ">Log In</a>
                    <a href="" className="group">
                        <span>
                            <HiOutlineShoppingBag size={26} />
                        </span>
                    </a>

                </div>
            </nav>
        </header>
        
     );
}
 
export default Navbar;