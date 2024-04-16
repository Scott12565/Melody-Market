import { Link } from "react-router-dom/cjs/react-router-dom.min";
import useSong from "../hooks/useSongs";

const SongsList = () => {

    const { allSongs, error } = useSong();
    // console.log(allSongs);
    // console.log(error);
    return ( 
        <div className=" w-[720px] h-full ">
            <div className="flex justify-between py-9 px-7">
                <h3 className="text-gray-300 font-semibold text-xl">All Songs</h3>
                <Link to="/allsongs" className="text-gray-300 text-lg hover:text-blue-500 hover:underline" >
                    see all
                </Link>
            
            </div>
            {allSongs?.map(song => (
                <div key={song.songid}>
                    <h1>{song.SongTitle}</h1>
                    <h4>{song.Artist}</h4>

                </div>
            ))}
        </div>
     );
}
 
export default SongsList;