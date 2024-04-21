import { Link } from "react-router-dom";
import { useContext } from "react";
import { SongContext } from "../context/songContext";

const LatestSongs = () => {
    const { latestSongs } = useContext(SongContext);
    // console.log(allSongs);
    // console.log(error);
    return ( 
        <div className=" min-w-[750px] h-full">
            <div className="flex justify-between py-9 px-7">
                <h3 className="text-gray-300 font-semibold text-xl">Latest Songs</h3>
                <Link to="/allsongs" className="text-gray-300 text-lg hover:text-blue-500 hover:underline" >
                    see all
                </Link>
            </div>
            
            <div className="h-[35%] px-3 ">
                {
                    latestSongs?.map(song => (
                        <div key={song.songid} className="h-full w-full  relative">
                            <div className="h-full " style={{ 
                                    backgroundImage: `url(${song.ImgUrl})`
                                    }}>
                                <p>title and artist</p>
                                </div>
                                <div className="overlay absolute top-0 w-full h-full bg-slate-500 opacity-15 ">
                                    <div>
                                        <h3>play</h3>
                                        <h3>+</h3>
                                        <h3>cart</h3>
                                    </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
     );
}
 
export default LatestSongs;