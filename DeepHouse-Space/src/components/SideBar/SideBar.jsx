import { Link } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useContext, useRef, useEffect } from "react";
import { SongContext } from "../../context/songContext";

const SideBar = () => {
    const { showSideBar, handleSideBar } = useContext(SongContext);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                if (showSideBar) {
                    handleSideBar();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [handleSideBar, showSideBar]);

    return (
        <div
            ref={sidebarRef}
            className={`sidebar w-[250px] md:w-[300px] lg:w-[225px] fixed top-0 left-0 z-50 h-full bg-white transition-transform duration-300 ease-in-out ${
                showSideBar ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div id="brand" className="w-full flex justify-between items-center py-1 my-1 pl-1.5 lg:hidden">
                {/* Brand name */}
                <h3 className="flex items-center">
                    <Link to="/" className="md:text-[18px] font-semibold text-gray-900">DeepHouse Space</Link>
                </h3>
                <span>
                    <IoCloseOutline size={30} onClick={handleSideBar} />
                </span>
            </div>

            <div className="flex flex-col justify-start items-start px-4 lg:px-6 lg:py-8">
                <Link to="/collection" className="hover" onClick={handleSideBar}>
                    Collection
                </Link>
                <Link to="/downloadable" className="hover" onClick={handleSideBar}>
                    Downloadable
                </Link>
                <div className="play-list">
                    <Link to="/playlist" className="hover" onClick={handleSideBar}>
                        PlayList
                    </Link>
                    <div className="play-list-items">
                        {/* Add play list items here */}
                    </div>
                </div>

                <Link to="createplaylist" className="my-5 mx-1.5 p-1.5 lg:p-2 bg-yellow-300 text-gray-900 text-sm rounded-lg border-0 hover:bg-yellow-500 hover:text-gray-100 font-semibold lg:font-semibold lg:text-lg" onClick={handleSideBar}>
                    <button>Create PlayList</button>
                </Link>
            </div>
        </div>
    );
};

export default SideBar;
