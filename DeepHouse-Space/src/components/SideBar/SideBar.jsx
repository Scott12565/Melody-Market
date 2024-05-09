import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useContext } from "react";
import { SongContext } from "../../context/songContext";

const SideBar = () => {
    const {handleSideBar} = useContext(SongContext);
    return ( 
        <div className="w-[250px] md:w-[300px] lg:w-[225px]  flex flex-col justify-start items-start  text-gray-300 bg-blue-400 opacity-[98] h-full">

            <div id="brand" className="w-full flex justify-between items-center py-2 my-1 pl-1.5 lg:hidden ">
                {/* Brand name */}
                <h3 className="flex items-center">
                    <Link to="/" className="md:text-[18px] font-semibold text-yellow-300 "> DeepHouse Space </Link>
                </h3>
                <span>
                    <IoCloseOutline size={30} onClick={handleSideBar} />
                </span>
            </div>

            <div className="flex flex-col justify-start items-start px-4 lg:px-6 lg:py-8">
                <Link to="/collection" className="hover " >
                    Collection
                </Link>
                <Link to="/downloadable" className="hover " >
                    Downloadable
                </Link>
                <div className="play-list">
                    <Link to="/playlist" className="hover " >
                        PlayList
                    </Link>
                    <div className="play-list-itmes">
                        
                    </div>
                </div>

                <Link to="createplaylist" className="my-5 mx-1.5 p-1.5 lg:p-2 bg-yellow-300 text-gray-900 text-sm rounded-lg border-0 hover:bg-yellow-500 hover:text-gray-100 font-semibold lg:font-semibold lg:text-lg" > 
                    <button>Create PlayList</button>
                </Link>
            </div>
        </div>
     );
}
 
export default SideBar;