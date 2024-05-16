import { useContext, useState } from "react";
import {Link} from "react-router-dom";
import { SongContext } from "../../context/songContext";
import { cartContext } from "../../context/CartContext";
import { LuDoorClosed, LuPlay } from "react-icons/lu";
import { MdDeleteSweep, MdPlaylistAdd } from "react-icons/md";

const CartPage = () => {const { allSongs } = useContext(SongContext);
    const { musicItems, removeSongFromCart } = useContext(cartContext);
    // const [countSong, setCountSong] = useState(0);
    // console.log(musicItems);

    return ( 
        <div className="">
           <div className="text-gray-300 text-lg font-medium text-xl my-5 mx-5 p-2 md:my-9 flex justify-between items-center">
            <h3 className="text-3xl">Music Cart</h3>
            <Link to="/checkout" className="transition-all duration-300 transform scale-95 text-[1.4rem] text-gray-900 bg-gray-300 rounded-md py-1.5 px-2 hover:bg-slate-400 hover:scale-100">
                    <button>CheckOut</button>
                </Link>
           </div>

           <div className="w-full ">
            {
                musicItems?.map((song, index) => (
                    <div key={song.songid} className="flex flex-1 justify-start items-center bg-blue-20 w-[98%] mx-auto space-x-3.5 text-gray-300 w-[95%] mx-auto border-b py-4 transition-all transform scale-100 hover:scale-105 cursor-pointer " >
                        <span className="text-2xl">{index += 1}.</span>
                        <img src={song.ImgUrl} alt={`song ${index += 1}`} className="w-[150px] rounded-sm" />
                        <div className="flex items-center justify-start w-full ">
                            <div className="flex flex-1 items-center justify-between py-2 px-1.5">
                                <div>
                                    <h2>
                                        {song.SongTitle}
                                    </h2>
                                    <h3 >
                                        {song.Artist}
                                    </h3>
                                </div>

                                <div className="flex flex-col">
                                    <p>{song.Genre}</p>
                                    <p>{song.Price}</p>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <i className="cursor-pointer">
                                        <LuPlay size={20} />
                                    </i>
                                    <i className="cursor-pointer">
                                        <MdPlaylistAdd size={30} />
                                    </i>
                                    <i className="cursor-pointer" onClick={() => removeSongFromCart(song.songid)}>
                                        <MdDeleteSweep size={30} />
                                    </i>
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
