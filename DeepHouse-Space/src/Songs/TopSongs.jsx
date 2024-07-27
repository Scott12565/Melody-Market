import { useContext, useState } from "react";
import { SongContext } from "../context/songContext";
import TopSong from "../components/TopSong";
import { Helmet } from "react-helmet-async";

const TopSongs = () => {

     const { topSongs } = useContext(SongContext);
     
     return ( 
         <>
         <Helmet >
         <title>DeepHouse Space - Top Songs</title>
                <meta name="description" content="Discover the top deep house tracks on DeepHouse Space. Explore the best songs in our top song collection and find your next favorite track!" />
                <meta name="keywords" content="deep house music, top songs, best deep house tracks, top house songs, deephouse space" />
                <meta property="og:title" content="DeepHouse Space - Top Songs" />
                <meta property="og:description" content="Discover the top deep house tracks on DeepHouse Space. Explore the best songs in our top song collection and find your next favorite track!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://www.deephousespace.com/topsongs" />
         </Helmet>
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
         </>
      );
 }
  
 export default TopSongs;
 