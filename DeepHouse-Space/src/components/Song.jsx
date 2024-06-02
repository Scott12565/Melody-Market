import { LuPause, LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdDeleteSweep } from "react-icons/md";
import { useContext, useState, useEffect } from "react";
import { cartContext } from "../context/CartContext";
import { musicPlayerContext } from "../context/musicPlayerContext";
import Player from "../Music-Player/Player";

const Song = ({ song }) => {
    const { addSongToCart, removeSongFromCart, musicItems } = useContext(cartContext);
    const { currentSong, playPause, isPlaying } = useContext(musicPlayerContext);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        setIsInCart(musicItems.some(songItem => songItem.songid === song.songid));
    }, [musicItems, song.songid]);

    const handlePlayPause = () => {
        playPause(song);
    };

    const handleCart = () => {
        if (!isInCart) {
            addSongToCart(song);
        } else {
            removeSongFromCart(song.songid);
        }
        setIsInCart(!isInCart);
    };

    return (
        <>
            <div className="song-card flex w-[99%] mx-auto my-1 shadow-transparent pt-2 transition-transform ease-in-out duration-500 transform scale-100 border-b hover:scale-105 hover:cursor-pointer md:flex-col md:w-52 md:bg-gray-700 md:border-0 md:shadow-2xl md:rounded-lg">
                <div className="hidden song-img w-[95%] mx-auto rounded-lg relative group md:block relative">
                    <div className="absolute top-1 right-1 text-sm bg-yellow-300 text-gray-800 p-1 rounded-md">
                        {song.Price}
                    </div>
                    <img src={song?.ImgUrl} alt={`song ${song?.songid}`} className="h-full bg-orange-400 rounded-lg" />

                    <div className="transition-transform ease-in-out duration-300 transform scale-0 bg-gray-900 text-gray-100 opacity-35 w-full h-full flex space-x-5 justify-center items-center absolute top-0 left-0 rounded-lg group-hover:scale-100">
                        <h1 className="text-yellow-200 hover:text-yellow-100">
                            {currentSong?.songid === song.songid && isPlaying ? (
                                <LuPause size={30} onClick={handlePlayPause} className="cursor-pointer" />
                            ) : (
                                <LuPlay size={30} onClick={handlePlayPause} className="cursor-pointer" />
                            )}
                        </h1>
                        <h1 className="text-orange-400 hover:text-orange-600">
                            {isInCart ? (
                                <MdDeleteSweep size={30} onClick={handleCart} className="cursor-pointer" />
                            ) : (
                                <BsCart3 size={30} onClick={handleCart} className="cursor-pointer" />
                            )}
                        </h1>
                    </div>
                </div>

                <div className="card-body flex justify-between items-center w-full my-2 py-0 px-1.5 text-[17px] mx-auto md:w-[95%] md:block md:py-1.5">
                    <div>
                        <h1 className="px-1 text-gray-300 font-200">{song?.SongTitle}</h1>
                        <h2 className="px-1 text-gray-300 font-200">By: {song?.Artist}</h2>
                    </div>
                    <h3 className="px-1.5 text-gray-300 font-200">{song?.Genre}</h3>
                    <span className="hidden text-sm px-1 text-gray-300 font-200 md:block">
                        {song?.releaseDate}
                    </span>

                    <div className="bg-gray-900 text-gray-100 flex space-x-2 justify-center items-center text-[25px] md:hidden">
                        <h1 className="text-yellow-200 hover:text-yellow-100">
                            <LuPlay />
                        </h1>
                        <h1 className="text-orange-400 hover:text-orange-600">
                            <BsCart3 />
                        </h1>
                    </div>
                </div>
                
            </div>
            
        </>
    );
};

export default Song;
