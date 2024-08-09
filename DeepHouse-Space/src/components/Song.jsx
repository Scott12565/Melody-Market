import { useContext, useState, useEffect } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdDeleteSweep, MdOutlineFileDownload } from "react-icons/md";
import { cartContext } from "../context/CartContext";
import { musicPlayerContext } from "../context/musicPlayerContext";
import { checkPurchaseContext } from "../context/downloadContext";
import { AuthContext } from "../context/firebaseContext";
import { formatCurrency } from "../utils/currencyformater";

const Song = ({ song }) => {
    const { currentUser } = useContext(AuthContext);
    const { musicItems } = useContext(cartContext);
    const { currentSong, playPause, isPlaying } = useContext(musicPlayerContext);
    const { checkPurchase, purchaseSong } = useContext(checkPurchaseContext);
    const [isInCart, setIsInCart] = useState(false);
    const [hasPurchased, setHasPurchased] = useState(false);

    useEffect(() => {
        setIsInCart(musicItems.some(songItem => songItem.songid === song.songid));
    }, [musicItems, song.songid]);

    useEffect(() => {
        setHasPurchased(checkPurchase(song.songid));
    }, [checkPurchase, song.songid]);

    const handlePlayPause = () => {
        playPause(song);
    };

    const handleCart = async () => {
        const { addSongToCarto, removeSongFromCart } = await import('../Pages/cart/index');
        if (!isInCart) {
            addSongToCarto(song);
        } else {
            removeSongFromCart(song.songid);
        }
    };

    const handleDownload = async (downloadLink) => {
        if (currentUser) {
            if (hasPurchased || song.isFree) {
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
            alert('Sign up before you can download this free track!');
        }
    };

    const handlePurchase = async () => {
        if (!hasPurchased && !song.isFree) {
            try {
                await purchaseSong(song.songid);
                setHasPurchased(true);
            } catch (err) {
                alert(err.message);
            }
        } else {
            console.log('Purchase unsuccessful');
        }
    };

    return (
        <div className="song-card flex w-[99%] mx-auto my-1 shadow-md pt-2 transition-transform ease-in-out duration-500 transform scale-100 border-b hover:scale-105 hover:cursor-pointer md:flex-col md:w-52 bg-gray-600 md:border-0 md:shadow-xl md:rounded-lg">
            <div className="hidden song-img w-[95%] mx-auto rounded-lg relative group md:block relative">
                <div className="absolute top-1 right-1 text-sm bg-yellow-300 text-gray-600 p-1 rounded-sm">
                    {formatCurrency(song.Price)}
                </div>
                <img src={song?.ImgUrl} loading="lazy" alt={`cover image for ${song?.SongTitle} by: ${song.Artist} song`} className="h-full bg-orange-400 rounded-lg" />

                <div className="transition-transform ease-in-out duration-300 transform scale-0 bg-blue-900 text-gray-100 opacity-50 w-full h-full flex space-x-5 justify-center items-center absolute top-0 left-0 rounded-lg group-hover:scale-100">
                    <h1 className="text-yellow-200 hover:text-yellow-100">
                        {currentSong?.songid === song.songid && isPlaying ? (
                            <LuPause size={27} onClick={handlePlayPause} className="cursor-pointer" />
                        ) : (
                            <LuPlay size={27} onClick={handlePlayPause} className="cursor-pointer" />
                        )}
                    </h1>
                    <h1 className="text-orange-400 hover:text-orange-600">
                        {isInCart ? (
                            <MdDeleteSweep size={27} onClick={handleCart} className="cursor-pointer" />
                        ) : (
                            <BsCart3 size={27} onClick={handleCart} className="cursor-pointer" />
                        )}
                    </h1>
                    <h1 className="text-orange-400 hover:text-orange-600">
                        <MdOutlineFileDownload size={27} onClick={() => handleDownload(song.SongUrl)} />
                    </h1>
                </div>
            </div>

            <div className="card-body flex justify-between items-center w-full my-2 py-0 px-1.5 text-[16px] mx-auto md:w-[95%] md:block md:py-1.5">
                <div>
                    <h1 className="px-1 text-gray-300 font-200 text-sm md:text-lg">{song?.SongTitle}</h1>
                    <h2 className="px-1 text-gray-300 font-200 text-sm md:text-lg">{song?.Artist}</h2>
                </div>
                <h3 className="px-1.5 text-gray-300 font-200 text-[15px]">{song?.Genre}</h3>
                <span className="hidden text-[15px] px-1 text-gray-300 font-200 md:block">
                    {song?.releaseDate}
                </span>
                {
                    !hasPurchased && !song.isFree && (
                        <button onClick={handlePurchase} className="text-green-600 hover:text-green-600 bg-yellow-300 px-1.5 py-0 my-2 rounded-md ">
                            Buy
                        </button>
                    )
                }
                <div className=" text-gray-100 flex space-x-2 justify-center items-center text-[25px] md:hidden">
                    <h1 className="text-yellow-200 hover:text-yellow-100">
                        {currentSong?.songid === song.songid && isPlaying ? (
                            <LuPause size={20} onClick={handlePlayPause} className="cursor-pointer" />
                        ) : (
                            <LuPlay size={20} onClick={handlePlayPause} className="cursor-pointer" />
                        )}
                    </h1>
                    <h1 className="text-orange-400 hover:text-orange-600">
                        {isInCart ? (
                            <MdDeleteSweep size={20} onClick={handleCart} className="cursor-pointer" />
                        ) : (
                            <BsCart3 size={20} onClick={handleCart} className="cursor-pointer" />
                        )}
                    </h1>
                    <h1>
                        <MdOutlineFileDownload size={22} onClick={() => handleDownload(song.SongUrl)} />
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Song;
