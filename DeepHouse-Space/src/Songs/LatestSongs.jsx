import { Link } from "react-router-dom";
import { useContext } from "react";
import { SongContext } from "../context/songContext";

const LatestSongs = () => {
    const { latestSongs } = useContext(SongContext);
    // console.log(allSongs);
    return ( 
        <div className="my-1">
            <div className="flex justify-between py-9 px-7">
                <h3 className="text-gray-300 font-semibold text-xl">Latest Songs</h3>
                <Link to="/allsongs" className="text-gray-300 text-lg hover:text-blue-500 hover:underline" >
                    see all
                </Link>
            </div>

            <div className="  h-[320px] relative">
                   {
                    latestSongs?.map(song => (
                    <div key={song.songid} className="w-full h-full bg-blue-700 absolute">
                        <div className=" text-gray-300 text-xl text-center absolute top-0 left-0 w-full h-full" style={{ 
                        backgroundImage: `url(${song.ImgUrl})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                        }}>
                    <p>title and artist</p>
                    </div>
                
                    <div className="absolute top-0 left-0 opacity-35 bg-slate-400 h-full w-full flex justify-center items-center space-x-6 text-xl text-black">
                        <h3>play</h3>
                        <h3>+</h3>
                        <h3>cart</h3>
                    </div>
                        </div>
                    ))
                   }
                
            </div>
        </div>
     );
}
 
export default LatestSongs;