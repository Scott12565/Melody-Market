import { useContext } from "react";
import { SongContext } from "../context/songContext";
import { LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";

const TopSongs = () => {

     const { topSongs } = useContext(SongContext);
     console.log(topSongs)
     return ( 
         <div className="w-full h-full">
              <h3 className="text-gray-300 font-semibold text-xl my-9 mx-5">
               Top Songs
              </h3>

              <div className="flex flex-col justify-start items-start w-[95%] mx-auto py-1.5 gap-y-5">
               {
                    topSongs?.map(song => (
                         <div key={song.songid} className="flex flex-1 justify-start items-center bg-blue-20 w-[90%] mx-auto space-x-4 text-gray-300"> 
                              <span className="text-xl text-white font-semibold">
                                   {song.songid / 2}.
                              </span>
                              <img src={song.ImgUrl} alt={`song ${song.songid}`} className="w-[110px]  " />

                              <div className="flex flex-col justify-between items-start text-gray-300 text-sm space-y-2">
                                   <div>
                                        <h4 className="text-lg font-semibold">{song.SongTitle}</h4>
                                        <p>{song.Artist}</p>
                                   </div>

                                   <div className="flex justify-start items-center space-x-2 ">
                                        <span className="cursor-pointer">
                                             <LuPlay size={20} />
                                        </span>
                                        <span className="cursor-pointer">
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
 