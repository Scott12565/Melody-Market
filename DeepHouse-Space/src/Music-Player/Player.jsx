import { useContext, useEffect, useRef } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { musicPlayerContext } from "../context/musicPlayerContext";

const Player = () => {
const {currentSong, isPlaying, playPause, setCurrentTime, currentTime, audioRef} = useContext(musicPlayerContext);
// const audioRef = useRef();

useEffect(() => {
    const audio = audioRef.current;
    if(audio && isPlaying){
        audio.play();
    } else {
        audio.pause();
    }
}, [isPlaying, currentSong]);

const handlePlayPause = () => {
    playPause(currentSong);
};

const handleProgressBar = e => {
    audioRef.current.currentTime = e.target.value;
    const playingCurrentTime = audioRef.current.currentTime;
    setCurrentTime(playingCurrentTime);
    console.log(currentTime);
}

  return (
    <div className="flex justify-between items-center fixed bottom-0 left-0 z-50 w-full p-4 bg-gray-700 opacity-8">
      <div>
        <img src="" alt="" />
        <div className="song-titles">
            <h1>title</h1>
            <h3>artist</h3>
        </div>
      </div>
      <div className="audio-player">
        <div className="audio-controls space-x-10">
            <button>Prev</button>
            <button onClick={handlePlayPause}>
                {isPlaying ? 'pause' : 'play'}
            </button>
            <button>Next</button>
        </div>
        <div className="audio-progress">
            <input type="range" min={0} max={audioRef.current?.duration} value={currentTime} onChange={handleProgressBar} />
        </div>
      </div>
      <div>
        <button>volume</button>
        <input type="range" name="volume" id="" min={0} max={0} />
        <div className="cart-buttons space-x-9">
            <button>play</button>
            <button>playlist</button>
            <button>cart</button>
            <span>price</span>
        </div>
      </div>
    </div>
  )
}

export default Player
