import { useContext } from "react";
import { SongContext } from "../context/songContext";

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
                         <div key={song.songid} className="flex flex-1 justify-start items-center bg-blue-20 w-[90%] mx-auto space-x-2 text-gray-300"> 
                              <span>
                                   {song.songid}.
                              </span>
                              <img src={song.ImgUrl} alt={`song ${song.songid}`} className="w-[100px]  " />
                              <div className="flex flex-col justify-between items-center text-gray-300 text-sm space-x-1">
                                   <h4>{song.SongTitle}</h4>
                                   <p>{song.Artist}</p>
                              </div>
                         </div>
                    ))
               }
              </div>
         </div>
      );
 }
  
 export default TopSongs;
 