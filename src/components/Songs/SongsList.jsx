import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useSong from "../hooks/useSongs";

const SongsList = () => {

    const { allSongs, error } = useSong();
    // console.log(allSongs);
    console.log(error);
    return ( 
        <div className=" w-[720px] bg-green-300">
            <div className="flex justify-between py-9 px-7">
                <h3 className="text-gray-300 font-semibold text-xl">All Songs</h3>
                <Link to="/allsongs" className="text-gray-300 text-lg hover:text-blue-500 hover:underline" >
                    see all
                </Link>
            
            </div>
            {allSongs?.map(song => (
                <div key={song.songid} className="px-5 py-3 text-gray-300 font-semibold text-lg flex justify-between" >
                    <h1>{song.SongTitle}</h1>
                    <h4>{song.Artist}</h4>
                    <img src={song.ImgUrl} alt={`song ${song.songid}`} className="w-[100px] "/>
                </div>
            ))}
        </div>
     );
}
 
export default SongsList;