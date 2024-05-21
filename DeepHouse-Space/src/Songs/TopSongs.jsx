import { useContext, useState } from "react";
import { SongContext } from "../context/songContext";

import TopSong from "../components/TopSong";

const TopSongs = () => {

     const { topSongs } = useContext(SongContext);
     
     return ( 
         <div className=" h-full">
              <h3 className="text-gray-300 text-lg font-medium  my-5 mx-5 md:my-9 lg:text-xl">
               Top Songs
              </h3>

              <div className="flex flex-col justify-start items-start w-[100%] mx-auto py-1.5 gap-y-5 border-l lg:border-none">
               {
                    topSongs?.map((song, index )=> (
                         <TopSong key={song.songid} topSong={song} index={index} />
                    ))
               }
              </div>
         </div>
      );
 }
  
 export default TopSongs;
 