import { LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";

const Song = ({ song }) => {
    console.log(song)
    return ( 
        <div className="song-card flex flex-col w-52 mx-auto my-5 shadow-2xl shadow-transparent rounded-lg bg-gray-700 pt-3 transition-transform ease-in-out duration-500 transform scale-100 hover:scale-105 hover:cursor-pointer">

            <div className="song-img w-[95%] mx-auto rounded-lg relative group ">
                <img src={song?.ImgUrl} alt={`song ${song?.songid}`} className="h-fullbg-orange-400 rounded-lg" />

                <div className=" transition-transform ease-in-out duration-300 transform scale-0 bg-gray-900 text-gray-100 opacity-35 w-full h-full flex space-x-5 justify-center items-center absolute top-0 left-0 rounded-lg group-hover:scale-100">
                    <h1 className="text-yellow-200 hover:text-yellow-100">
                        <LuPlay size={30} />
                    </h1>
                    <h1 className="text-orange-400 hover:text-orange-600">
                        <BsCart3 size={30} />
                    </h1>
                </div>
            </div>

            <div className="card-body w-[95%] my-2 py-1.5 px-1.5 text-lg mx-auto">
                <h1 className="text-lg px-1 text-gray-300 font-200">
                    {song?.SongTitle}
                </h1>
                <h2 className="text-lg px-1 text-gray-300 font-200">By: {song?.Artist}</h2>
                <h3 className="text-lg px-1.5 text-gray-300 font-200">
                    {song?.Genre}
                </h3>
                <span className="text-sm px-1 text-gray-300 font-200">
                    {song?.releaseDate}
                </span>
            </div>
        </div>
     );
}
 
export default Song;