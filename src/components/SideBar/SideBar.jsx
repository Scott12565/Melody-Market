import { Link } from "react-router-dom";

const SideBar = () => {
    return ( 
        <div className="h-full md:w-[200px] border-r border-gray-400 flex flex-col justify-start items-start py-9 px-6 text-gray-300">
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

            <Link to="createplaylist" className="my-5 mx-1.5 p-2 bg-yellow-300 text-gray-900 text-lg font-semibold rounded-lg border-0 hover:bg-yellow-500 hover:text-gray-100" > 
                <button>Create PlayList</button>
            </Link>
        </div>
     );
}
 
export default SideBar;