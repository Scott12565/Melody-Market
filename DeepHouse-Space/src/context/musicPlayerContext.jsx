import { createContext, useState, useEffect, useRef, useContext } from "react";
import { SongContext } from "./songContext";

export const musicPlayerContext = createContext();

const MusicPlayerContextProvider = ({ children }) => {

  const {allSongs} = useContext(SongContext);
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

useEffect(() => {
  if (!isPlaying) {
    audioRef.current.pause();
  } else {
      audioRef.current.play();
  }
}, [isPlaying, currentSong]);


useEffect(() => {
  const audio = audioRef.current;

  const updateTime = () => {
    setCurrentTime(audio.currentTime);
    console.log(currentTime);
  };

  const updateDuration = () => {
    setDuration(audio.duration);
    
  };

  audio.addEventListener('timeupdate', updateTime);
  audio.addEventListener('loadedmetadata', updateDuration);

  return () => {
    audio.removeEventListener('timeupdate', updateTime);
    audio.removeEventListener('loadedmetadata', updateDuration);
  };
});

const nextSong = () => {
  if (allSongs?.length > 0) {
      const currentIndex = allSongs.findIndex(song => song.songid === currentSong.songid);
      if (currentIndex === allSongs.length - 1) {
          setCurrentSong(allSongs[0]);
      } else {
          setCurrentSong(allSongs[currentIndex + 1]);
      }
  }
}

const prevSong = () => {
  if(allSongs?.length > 0){
    const currentIndex = allSongs.findIndex(song => song.songid === currentSong.songid);
      if (currentIndex === 0) {
          setCurrentSong(allSongs[allSongs?.length - 1]);
      } else {
          setCurrentSong(allSongs[currentIndex - 1]);
      }
  }
}

const progressBar = e => {
  audioRef.current.currentTime = e.target.value;
}

  return (
    <musicPlayerContext.Provider value={{currentSong, playPause, isPlaying, setCurrentTime, currentTime, audioRef, progressBar, nextSong, prevSong}}>
      <audio src={currentSong?.SongUrl} ref={audioRef} />
      {children}
    </musicPlayerContext.Provider>
  );
};

export default MusicPlayerContextProvider;
