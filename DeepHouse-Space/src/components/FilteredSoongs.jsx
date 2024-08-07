import { useContext, useEffect, useState } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdDeleteSweep, MdOutlineFileDownload } from "react-icons/md";
import { cartContext } from "../context/CartContext";
import { musicPlayerContext } from "../context/musicPlayerContext";
import { SongContext } from "../context/songContext";
import { checkPurchaseContext } from "../context/downloadContext";
import { AuthContext } from "../context/firebaseContext";

const FilteredSongs = () => {
    const { filteredSongs } = useContext(SongContext);
    const { hasPurchased, checkPurchase } = useContext(checkPurchaseContext);
    const [song, setSong] = useState(null);
    const { musicItems } = useContext(cartContext);
    const { currentSong, playPause, isPlaying } = useContext(musicPlayerContext);
    const { currentUser } = useContext(AuthContext);

    const isInCart = (song) => {
        return musicItems.some((songItem) => songItem.songid === song.songid);
    };

    const handlePlayPause = (song) => {
        playPause(song);
    };

    useEffect(() => {
        checkPurchase(song?.songid)
    }, currentUser, song?.songid);

    const handleCart = async () => {
        const { addSongToCarto, removeSongFromCart } = await import('../index');
        if (!isInCart) {
            addSongToCarto(song);
        } else {
            removeSongFromCart(song.songid);
        }
    };

    const handleDownload = async (downloadLink, song) => {
        setSong(song);
        if(currentUser) {
            if (hasPurchased || song.isFree) {
                // console.log(hasPurchased)
                try {
                    const { downloadSong } = await import('../index');
                    downloadSong(downloadLink);
                } catch (error) {
                    console.log(error.message);
                }
            } else {
                alert("You need to purchase this song before downloading.");
            }
        } else {
            alert('sign up before you can download this free track!')
        }
    }

    return (
        <div className="flex flex-wrap justify-center">
            {filteredSongs.map((song) => (
                <div key={song.songid} className="song-card flex w-99 mx-auto my-1 shadow-transparent pt-2 transition-transform ease-in-out duration-500 transform scale-100 border-b hover:scale-105 hover:cursor-pointer md:flex-col md:w-52 md:bg-gray-600 md:border-0 md:shadow-2xl md:rounded-lg">
                    <div className="hidden song-img w-95 mx-auto rounded-lg relative group md:block relative">
                        <div className="absolute top-1 right-1 text-sm bg-yellow-300 text-gray-800 p-1 rounded-md">
                            {song.Price}
                        </div>
                        <img src={song?.ImgUrl} alt={`song ${song?.songid}`} className="h-full bg-orange-400 rounded-lg" />

                        <div className="transition-transform ease-in-out duration-300 transform scale-0 bg-blue-900 text-gray-100 opacity-50 w-full h-full flex space-x-5 justify-center items-center absolute top-0 left-0 rounded-lg group-hover:scale-100">
                            <h1 className="text-yellow-200 hover:text-yellow-100">
                                {currentSong?.songid === song.songid && isPlaying ? (
                                    <LuPause size={27} onClick={() => handlePlayPause(song)} className="cursor-pointer" />
                                ) : (
                                    <LuPlay size={27} onClick={() => handlePlayPause(song)} className="cursor-pointer" />
                                )}
                            </h1>
                            <h1 className="text-orange-400 hover:text-orange-600">
                                {isInCart(song) ? (
                                    <MdDeleteSweep size={27} onClick={() => handleCart(song)} className="cursor-pointer" />
                                ) : (
                                    <BsCart3 size={27} onClick={() => handleCart(song)} className="cursor-pointer" />
                                )}
                            </h1>
                            <h1>
                                <MdOutlineFileDownload size={27} />
                            </h1>
                        </div>
                    </div>

                    <div className="card-body flex justify-between items-end w-full my-2 py-0 px-1.5 text-17 mx-auto md:w-95 md:block md:py-1.5 space-x-2">
                        <div>
                            <h1 className="px-1 text-gray-300 font-200 text-sm md:text-lg">{song?.SongTitle}</h1>
                            <h2 className="px-1 text-gray-300 font-200 text-sm md:text-lg">{song?.Artist}</h2>
                        </div>
                        <h3 className="px-1.5 text-gray-300 font-200 text-17">{song?.Genre}</h3>
                        <span className="hidden text-16 px-1 text-gray-300 font-200 md:block">
                            {song?.releaseDate}
                        </span>

                        <div className="bg-gray-900 text-gray-100 flex space-x-2 justify-center items-center text-25 md:hidden">
                            <h1 className="text-yellow-200 hover:text-yellow-100">
                                {currentSong?.songid === song.songid && isPlaying ? (
                                    <LuPause size={20} onClick={() => handlePlayPause(song)} className="cursor-pointer" />
                                ) : (
                                    <LuPlay size={20} onClick={() => handlePlayPause(song)} className="cursor-pointer" />
                                )}
                            </h1>
                            <h1 className="text-orange-400 hover:text-orange-600">
                                {isInCart(song) ? (
                                    <MdDeleteSweep size={20} onClick={() => handleCart(song)} className="cursor-pointer" />
                                ) : (
                                    <BsCart3 size={20} onClick={() => handleCart(song)} className="cursor-pointer" />
                                )}
                            </h1>
                            <h1>
                                <MdOutlineFileDownload size={22} onClick={() => handleDownload(song.SongUrl, song)} />
                            </h1>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FilteredSongs;
