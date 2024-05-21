import { useContext } from "react";
import Song from "../components/Song";
import { Link } from "react-router-dom";
import { SongContext } from "../context/songContext";
import { MdDeleteSweep, MdPlaylistAdd } from "react-icons/md";

function AllSongs() {

    const isPlaying = true;

    const { allSongs } = useContext(SongContext);
    // console.log(allSongs)
    return ( 
        <div className="text-white text-2xl py-5 px-4 flex flex-col my-2 lg:py-10">

            <div className="flex justify-between">
                <h3 className="text-gray-300 text-lg lg:text-xl font-medium">All Songs</h3>
                <Link to="/allsongs" className="text-gray-300 text-lg hover:text-blue-500 hover:underline" >
                    see all
                </Link>
            </div>

            <div className="flex flex-col flex-wrap justify-between gap-2.5 py-1 md:flex-row">
                {
                    allSongs?.map(song => (
                        <Song key={song?.songid} song={song} isPlaying={isPlaying} />
                    ))
                }
            </div>
        </div>
     );
}

export default AllSongs;