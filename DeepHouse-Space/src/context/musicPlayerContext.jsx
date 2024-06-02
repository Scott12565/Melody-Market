import { createContext, useState, useEffect, useRef } from "react";
import { SongContext } from "./songContext";

export const musicPlayerContext = createContext();

const MusicPlayerContextProvider = ({ children }) => {
  // const [playingSongId, setPlayingSongId] = useState(false);
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPause = song => {
    const songId = song.songid;
    if(currentSong?.songid === songId){
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(!isPlaying);
    }
  }

  useEffect(() => {
    const audio = audioRef.current;
    if(audio && isPlaying){
        audio.play();
    } else {
        audio.pause();
    }
}, [isPlaying, currentSong]);


 console.log(currentSong?.SongUrl);
  // const playPause = (song) => {
  //   const songId = song.songid
  //   if(playingSongId === songId){
  //     setIsPlaying(!isPlaying);
  //     setPlayingSongId(null)
  //   } else {
  //     setPlayingSongId(songId);
  //     setIsPlaying(true);
  //   }
  // };

  return (
    <musicPlayerContext.Provider value={{currentSong, playPause, isPlaying, setCurrentTime, currentTime, audioRef }}>
      <audio src={currentSong?.SongUrl} ref={audioRef} />
      {children}
    </musicPlayerContext.Provider>
  );
};

export default MusicPlayerContextProvider;
