import { useContext, useState } from "react";
import {Link} from "react-router-dom";
import { SongContext } from "../../context/songContext";
import { cartContext } from "../../context/CartContext";
import { LuPause, LuPlay } from "react-icons/lu";
import { MdDeleteSweep, MdPlaylistAdd } from "react-icons/md";
import { musicPlayerContext } from "../../context/musicPlayerContext";

const CartPage = () => {
    const { musicItems, removeSongFromCart } = useContext(cartContext);
    const {currentSong, playPause, isPlaying} = useContext(musicPlayerContext);

    const handlePlayPause = () => {
        musicItems?.map(songItem => {
            playPause(songItem);
        });
    };

    return ( 
        <div className="">
           <div className="text-gray-300 text-lg font-medium my-1 mx-4 p-2 md:my-9 flex justify-between items-center md:text-xl lg:my-5 lg:mx-5">
            <h3 className="text-xl md:text-2xl lg:text-3xl">Music Cart</h3>
            <Link to="/checkout" className="transition-all duration-300 transform scale-95 text-lg text-gray-900 bg-gray-300 rounded-md py-1.5 px-2 hover:bg-slate-400 hover:scale-100 md:text-[1.4rem]">
                    <button>CheckOut</button>
                </Link>
           </div>

           <div className="w-full">
            {
                musicItems?.map((song, index) => (
                    <div key={song.songid} className="flex flex-1 justify-start items-center bg-blue-20 w-[98%] mx-auto space-x-2.5 text-gray-300 w-[95%] mx-auto border-b py-4 transition-all transform scale-95 hover:scale-100 cursor-pointer md:space-x-3.5 " >
                        <span className="text-2xl">{index += 1}.</span>
                        <img src={song.ImgUrl} alt={`song ${index += 1}`} className="hidden md:block w-[150px] rounded-sm" />
                        <div className="flex items-center justify-start w-full ">
                            <div className="flex flex-1 items-center justify-between py-2 px-1.5">
                                <div>
                                    <h2 className="text-[1.1rem]">
                                        {song.SongTitle}
                                    </h2>
                                    <h3 className="text-[1.1rem]">
                                        {song.Artist}
                                    </h3>
                                </div>

                                <div className="flex flex-col text-[1rem]">
                                    <p>{song.Genre}</p>
                                    <p>{song.Price}</p>
                                </div>

                                <div className="flex items-start space-x-3">
                                <h1 className="text-yellow-200 hover:text-yellow-100">
                                    {currentSong?.songid === song.songid && isPlaying ? (
                                        <LuPause size={30} onClick={handlePlayPause} className="cursor-pointer" />
                                    ) : (
                                        <LuPlay size={30} onClick={handlePlayPause} className="cursor-pointer" />
                                    )}
                                </h1>
                                    <h1 className="cursor-pointer">
                                        <MdPlaylistAdd size={30} />
                                    </h1>
                                    <h1 className="cursor-pointer" onClick={() => removeSongFromCart(song.songid)}>
                                        <MdDeleteSweep size={30} />
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
           </div>
        </div>
     );
}
 
export default CartPage;
