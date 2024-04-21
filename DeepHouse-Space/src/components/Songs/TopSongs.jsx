import { useContext } from "react";
import { SongContext } from "../context/songContext";

const TopSongs = () => {

     const { topSongs } = useContext(SongContext);
     console.log(topSongs)
     return ( 
         <div className="w-[300px] h-full">
              <h3 className="text-gray-300 font-semibold text-xl my-9 mx-5">Top Songs</h3>

              <div className="flex flex-col justify-start items-start w-[95%] mx-auto">
               {
                    topSongs?.map(song => (
                         <div key={song.songid} className="flex justify-between items-center bg-blue-20 w-[95%] mx-auto"> 
                              <img src={song.ImgUrl} alt={`song ${song.songid}`} className="w-[100px]  " />
                              <div className="flex justify-between items-center text-gray-300 text-sm space-x-1">
                                   <h4>{song.SongTitle}</h4>
                                   <p>{song.Artist}</p>
                                   <span>{song.Genre}</span>
                                   <span>{song.Duration}</span>
                              </div>
                         </div>
                    ))
               }
              </div>
         </div>
      );
 }
  
 export default TopSongs;
 