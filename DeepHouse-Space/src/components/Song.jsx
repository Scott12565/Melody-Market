import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LuPause, LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdDeleteSweep, MdOutlineFileDownload } from "react-icons/md";
import { cartContext } from "../context/CartContext";
import { musicPlayerContext } from "../context/musicPlayerContext";
import { checkPurchaseContext } from "../context/downloadContext";
import { AuthContext } from "../context/firebaseContext";
import { formatCurrency } from "../utils/currencyformater";
import { messageContext } from "../context/messageContext";

const Song = ({ song }) => {
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const { musicItems, setSelectedSong } = useContext(cartContext);
    const { currentSong, playPause, isPlaying } = useContext(musicPlayerContext);
    const { checkPurchase, purchaseSong } = useContext(checkPurchaseContext);
    const { displayMessage } = useContext(messageContext);
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
        if (!currentUser) {
            displayMessage('error', 'Please log in before adding songs to the cart.');
            return;
        }
        
        const { addSongToCarto, removeSongFromCart } = await import('../Pages/cart/index');
        if (!isInCart) {
            addSongToCarto(song);
            displayMessage('success', 'Song added to cart')
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
                    displayMessage('success', 'Download started...')
                } catch (error) {
                    displayMessage('error', error.message)
                }
            } else {
                displayMessage('error', 'You need to purchase this song before downloading.');
            }
        } else {
            displayMessage('error', 'Sign up before downloading this track!')
        }
    };

    const handlePurchase = async () => {
        if (currentUser) {
            if (!hasPurchased && !song.isFree) {
                try {
                    await purchaseSong(song.songid);
                    setHasPurchased(true);
                    displayMessage('success', 'Purchased Successfully!');
                    // Redirect to confirmation page with selected song data
                    setSelectedSong(song);
                    history.push({
                        pathname: '/checkout'
                    });
                } catch (err) {
                    displayMessage('error', 'Purchase unsuccessful, try again!');
                }
                return;
            }
        } else {
            displayMessage('error', 'Please log in before purchasing this song!');
        }
    };

    return (
        <div className="song-card flex w-[99%] mx-auto my-1 shadow-md pt-2 transition-transform ease-in-out duration-500 transform border-b cursor-pointer md:flex-col md:w-[20rem] lg:w-[18.5rem] bg-gray-600 md:border-0 md:shadow-xl md:rounded-lg">
            {/* Song Image and Actions */}
            <div className="hidden song-img w-[95%] mx-auto rounded-lg relative group md:block relative">
                <div className="absolute top-1 left-1 text-sm bg-yellow-300 text-gray-600 p-1 rounded-sm">
                    {song.isFree ? 'Free' : 'Exclusive'}
                </div>
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

            {/* Song Details */}
            <div className="card-body flex justify-between items-center w-full my-2 py-0 px-1.5 text-[16px] mx-auto md:w-[95%] md:block md:py-1.5">
                <div>
                    <h1 className="px-1 text-gray-300 font-200 md:text-2xl">{song?.SongTitle}</h1>
                    <h2 className="px-1 text-gray-300 font-200 text-sm md:text-lg">{song?.Artist}</h2>
                </div>
                <h3 className="hidden md:block px-1.5 text-gray-300 font-200 text-[15px]">{song?.Genre}</h3>
                <span className="hidden text-[15px] px-1 text-gray-300 font-200 md:block">
                    {song?.releaseDate}
                </span>
                <span>
                    {!hasPurchased && !song.isFree && (
                        <button onClick={handlePurchase} className="text-green-600 text-[15px] hover:text-green-600 bg-yellow-300 py-[1px] px-1.5 md:p-2 md:text-lg my- md:block rounded-md">
                            Buy
                        </button>
                    )}
                </span>
                <div className="text-gray-100 flex space-x-2 justify-center items-center text-25 md:hidden">
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
                        <MdOutlineFileDownload className="cursor-pointer" size={22} onClick={() => handleDownload(song.SongUrl)} />
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Song;
