import { useState, useContext, useEffect } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdDeleteSweep, MdOutlineFileDownload } from "react-icons/md";
import { cartContext } from "../context/CartContext";
import { musicPlayerContext } from "../context/musicPlayerContext";
import { SongContext } from "../context/songContext";
import Song from "./Song";

const TopSong = ({ topSong, index }) => {
    const { handleDownload } = useContext(SongContext);
    const { addSongToCart, removeSongFromCart, musicItems } = useContext(cartContext);
    const { currentSong, playPause, isPlaying} = useContext(musicPlayerContext);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        setIsInCart(musicItems.some(songItem => songItem.songid === topSong.songid));
    }, [musicItems, topSong.songid]);

    const handlePlayPause = () => {
        playPause(topSong)
    };

    const handleCart = () => {
        if (!isInCart) {
            addSongToCart(topSong);
        } else {
            removeSongFromCart(topSong.songid);
        }
        setIsInCart(!isInCart);
    };

    return (
        <div className="flex flex-1 justify-start items-center w-[97%] mx-auto space-x-3.5 text-gray-300 border-b py-2 md:w-[90%]">
            <span className="text-lg text-white font-medium">
                {index + 1}.
            </span>
            <img src={topSong.ImgUrl} alt={`song ${topSong.songid}`} className="w-[95px] rounded-sm" />
            <div className="flex justify-between items-start text-gray-300 text-sm space-y-2 lg:flex-col w-full">
                <div>
                    <h4 className="text-[16px] font-medium">{topSong.SongTitle}</h4>
                    <p>{topSong.Artist}</p>
                </div>
                <div className="flex justify-start items-center space-x-2">
                    <span className="">
                        {currentSong?.songid === topSong.songid && isPlaying ? (
                            <LuPause size={23} onClick={handlePlayPause} className="cursor-pointer" />
                        ) : (
                            <LuPlay size={23} onClick={handlePlayPause} className="cursor-pointer" />
                        )}
                    </span>
                    <span className="">
                        {isInCart ? (
                            <MdDeleteSweep size={23} onClick={handleCart} className="cursor-pointer" />
                        ) : (
                            <BsCart3 size={23} onClick={handleCart} className="cursor-pointer" />
                        )}
                    </span>
                    <span className=""onClick={() => handleDownload(topSong.SongUrl)} >
                        <MdOutlineFileDownload size={23} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TopSong;
