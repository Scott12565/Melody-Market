import { useState, useContext } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdDeleteSweep, MdPlaylistAdd } from "react-icons/md";
import { cartContext } from "../context/CartContext";

const TopSong = ({ topSong, index }) => {

     const {addSongToCart, removeSongFromCart } = useContext(cartContext);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

     const handleCart = () => {
        if(!isInCart){
            addSongToCart(topSong);
            setIsInCart(!isInCart);
        } else {
            removeSongFromCart(topSong.songid);
            setIsInCart(!isInCart);
        };
     };
    return ( 
        <div className="flex flex-1 justify-start items-center w-[97%] mx-auto space-x-3.5 text-gray-300 border-b py-2 md:w-[90%]"> 
            <span className="text-lg text-white font-medium">
                {index + 1}.
            </span>
            <img src={topSong.ImgUrl} alt={`song ${topSong.songid}`} className=" w-[95px] rounded-sm " />

            <div className="flex justify-between items-start text-gray-300 text-sm space-y-2 lg:flex-col w-full">
                <div>
                    <h4 className="text-sm font-medium">{topSong.SongTitle}</h4>
                    <p>{topSong.Artist}</p>
                </div>

                <div className="flex justify-start items-center space-x-2 ">
                    <h1 className="">
                            {
                                isPlaying ? <LuPause size={25} onClick={handlePlayPause} className="cursor-pointer" />  : <LuPlay size={25} onClick={handlePlayPause} className="cursor-pointer" />
                            }
                    </h1>
                    <span className="" >
                    {
                            isInCart ? <MdDeleteSweep size={30} onClick={handleCart} className="cursor-pointer" /> : <BsCart3 size={30} onClick={handleCart} className="cursor-pointer" />
                        } 
                    </span>
                </div>
            </div>
        </div>
     );
}
 
export default TopSong;