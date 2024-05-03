import { Link } from "react-router-dom";
import { useContext } from "react";
import { SongContext } from "../context/songContext";

const LatestSongs = () => {
    const { latestSongs } = useContext(SongContext);
    // console.log(allSongs);
    return ( 
        <div className=" w-[500px] h-full">
            <div className="flex justify-between py-9 px-7">
                <h3 className="text-gray-300 font-semibold text-xl">Latest Songs</h3>
                <Link to="/allsongs" className="text-gray-300 text-lg hover:text-blue-500 hover:underline" >
                    see all
                </Link>
            </div>
            <div className="h-[35%] w-full relative ">
                {
                    latestSongs?.map(song => (
                        <div key={song.songid} className="h-full w-full absolute">
                            <div className="h-full text-gray-300 text-xl text-center" style={{ 
                                    backgroundImage: `url(${song.ImgUrl})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                    }}>
                                <p>title and artist</p>
                            </div>
                            <div className="overlay absolute top-0 w-full h-full bg-slate-500 opacity-75 ">
                                <div className="">
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