import { useContext } from "react";
import Song from "../components/Song";
import { Link } from "react-router-dom";
import { SongContext } from "../context/songContext";

function AllSongs() {

    const { allSongs } = useContext(SongContext);
    console.log(allSongs)
    return ( 
        <div className="text-white text-2xl py-12  px-4 flex flex-col">

            <div className="flex justify-between">
                <h3 className="text-gray-300 font-semibold text-xl">All Songs</h3>
                <Link to="/allsongs" className="text-gray-300 text-lg hover:text-blue-500 hover:underline" >
                    see all
                </Link>
            </div>

            <div className="flex flex-wrap justify-between gap-3 py-4">
                {
                    allSongs?.map(song => (
                        <Song key={song?.songid} song={song} />
                    ))
                }
            </div>
        </div>
     );
}

export default AllSongs;