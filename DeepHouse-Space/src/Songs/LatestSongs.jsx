import { Link } from "react-router-dom";
import { useContext } from "react";
import { SongContext } from "../context/songContext";
import { LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { GrFormPreviousLink } from "react-icons/gr";
import { GrFormNextLink } from "react-icons/gr";
import { playlistContext } from "../context/PlayListContext";

const LatestSongs = () => {
    const { latestSongs } = useContext(SongContext);
    const { addToPlayList } = useContext(playlistContext);
    
    return ( 
        <div className="my-1">
            <div className="flex justify-between py-9 px-7">
                <h3 className="text-gray-300 font-semibold text-xl">Latest Songs</h3>
                <Link to="/allsongs" className="text-gray-300 text-lg hover:text-blue-500 hover:underline" >
                    see all
                </Link>
            </div>

            <div className="  h-[320px] relative group">
                    <div className="absolute top-0 left-0 opacity-40 bg-slate-400 h-full w-full flex justify-center items-center space-x-6 text-xl bg-gray-700 text-black z-10 transition-transform ease-in-out duration-500 scale-0 group-hover:scale-100 cursor-pointer">
                        <h3 className="cursor-pointer">
                            <LuPlay size={35} />
                        </h3>
                        <h3 className="cursor-pointer">
                            <RiPlayListLine size={35} />
                        </h3>
                        <h3 className="cursor-pointer">
                            <BsCart3 size={35} />
                        </h3>
                    </div>
                    <div className="buttons absolute bottom-4 z-30  space-y-1.5 mx-2">
                        <button className="prev-btn  p-1 bg-gray-400 text-gray-300 opacity-80 rounded-full">
                            <GrFormPreviousLink size={30} />
                        </button>
                        <button className="next-btn p-1 bg-gray-400 text-gray-300 opacity-80 rounded-full">
                            <GrFormNextLink size={30} />
                        </button>
                    </div>
                   {
                    latestSongs?.map(song => (
                    <div key={song.songid} className="w-full h-full bg-blue-700 absolute">
                        <div className=" text-gray-300 text-xl text-center absolute top-0 left-0 w-full h-full" style={{ 
                        backgroundImage: `url(${song.ImgUrl})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                        }}>
                            <p>{song.SongTitle} by {song.Artist}</p>
                        </div>
                    </div>
                    ))
                   }
                
            </div>
        </div>
     );
}
 
export default LatestSongs;