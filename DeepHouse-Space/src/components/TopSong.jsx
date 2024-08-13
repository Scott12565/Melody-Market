import { useState, useContext, useEffect } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdDeleteSweep, MdOutlineFileDownload } from "react-icons/md";
import { cartContext } from "../context/CartContext";
import { musicPlayerContext } from "../context/musicPlayerContext";
import { SongContext } from "../context/songContext";
import { AuthContext } from "../context/firebaseContext";
import { checkPurchaseContext } from "../context/downloadContext";
import { formatCurrency } from "../utils/currencyformater";

const TopSong = ({ topSong, index }) => {
    // const { handleDownload } = useContext(SongContext);
    const { currentUser } = useContext(AuthContext);
    const { checkPurchase, hasPurchased } = useContext(checkPurchaseContext);
    const { musicItems } = useContext(cartContext);
    const { currentSong, playPause, isPlaying} = useContext(musicPlayerContext);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        setIsInCart(musicItems.some(songItem => songItem.songid === topSong.songid));
    }, [musicItems, topSong.songid]);

    const handlePlayPause = () => {
        playPause(topSong)
    };

    const handleCart = async (song) => {
        const { addSongToCarto, removeSongFromCart } = await import('../Pages/cart/index');
        if (!isInCart) {
            addSongToCarto(song);
        } else {
            removeSongFromCart(song.songid);
        }
    };

    useEffect(() => {
        checkPurchase(topSong.songid);
    }, [currentUser, topSong.songid])

    const handleDownload = async (downloadLink) => {
        if(currentUser) {
            if(hasPurchased || topSong.isFree){
                try {
                    const { downloadSong } = await import('../index');
                    downloadSong(downloadLink);
                } catch (err) {
                    console.log(err.message);
                }
            }
        }
    }

    return (
        <div className="flex flex-1 justify-start items-center w-[97%] mx-auto space-x-3.5 text-gray-300 border-b py-2 md:w-[90%]">
            <span className="text-lg text-white font-medium">
                {index + 1}.
            </span>
            <img src={topSong.ImgUrl} loading="lazy" alt={`cover image for ${topSong.SongTitle} by ${topSong.Artist} song`} className="hidden md:block w-[95px] rounded-sm" />
            <div className="flex justify-between items-start text-gray-300 text-sm space-y-3 lg:flex-col space-y-1 w-full">
                <div className="space-y-1">
                    <h4 className="text-[16px] font-medium">{topSong.SongTitle}</h4>
                    <p>{topSong.Artist}</p>
                </div>

                <p className="text-[#0E1411] bg-[#F9E165] cursor-pointer p-1 rounded-md">{formatCurrency(topSong?.Price)}</p>

                <div className="flex justify-start items-center space-x-2">
                    <span className="">
                        {currentSong?.songid === topSong.songid && isPlaying ? (
                            <LuPause size={23} onClick={handlePlayPause} className="cursor-pointer" />
                        ) : (
                            <LuPlay size={23} onClick={handlePlayPause} className="cursor-pointer text-[#F9E165]" />
                        )}
                    </span>
                    <span className="">
                        {isInCart ? (
                            <MdDeleteSweep size={23} onClick={() => handleCart(topSong)} className="cursor-pointer text-red-600" />
                        ) : (
                            <BsCart3 size={23} onClick={() => handleCart(topSong)} className="cursor-pointer text-[#F9E165] " />
                        )}
                    </span>
                    <span className="text-[#F9E165]" onClick={() => handleDownload(topSong.SongUrl)} >
                        <MdOutlineFileDownload size={23} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopSong;
