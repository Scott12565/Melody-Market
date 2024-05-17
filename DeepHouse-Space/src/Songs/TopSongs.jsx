import { useContext } from "react";
import { SongContext } from "../context/songContext";
import { LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { cartContext } from "../context/CartContext";
import { MdDeleteSweep, MdPlaylistAdd } from "react-icons/md";

const TopSongs = () => {

     const { topSongs } = useContext(SongContext);
     const { addSongToCart } = useContext(cartContext);
     // console.log(topSongs)
     return ( 
         <div className="w-full h-full">
              <h3 className="text-gray-300 text-lg font-medium text-xl my-5 mx-5 md:my-9">
               Top Songs
              </h3>

              <div className="flex flex-col justify-start items-start w-[95%] mx-auto py-1.5 gap-y-5 w-full border-l lg:border-none">
               {
                    topSongs?.map(song => (
                         <div key={song.songid} className="flex flex-1 justify-start items-center bg-blue-20 w-[90%] mx-auto space-x-3.5 text-gray-300 w-[95%] mx-auto border-b py-2"> 
                              <span className="text-lg text-white font-medium">
                                   {song.songid / 2}.
                              </span>
                              <img src={song.ImgUrl} alt={`song ${song.songid}`} className="w-[95px] rounded-sm  " />

                              <div className="flex justify-between items-start text-gray-300 text-sm space-y-2 lg:flex-col w-full">
                                   <div>
                                        <h4 className="text-sm font-medium">{song.SongTitle}</h4>
                                        <p>{song.Artist}</p>
                                   </div>

                                   <div className="flex justify-start items-center space-x-2 ">
                                        <span className="cursor-pointer">
                                             <LuPlay size={20} />
                                        </span>
                                        <span className="cursor-pointer" onClick={() => addSongToCart(song)}>
                                             <BsCart3 size={20} />
                                        </span>
                                   </div>
                              </div>
                         </div>
                    ))
               }
              </div>
         </div>
      );
 }
  
 export default TopSongs;
 