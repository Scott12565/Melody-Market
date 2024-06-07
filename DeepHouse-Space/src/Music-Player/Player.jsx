import { useContext, useEffect, useRef } from "react";
import { musicPlayerContext } from "../context/musicPlayerContext";
import { LuPause, LuPlay, LuVolume } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdDeleteSweep, MdPlaylistAdd } from "react-icons/md";
import { TbPlayerPlay, TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb"

const Player = () => {
const {currentSong, 
    isPlaying, 
    playPause, 
    setCurrentTime, 
    currentTime, 
    audioRef, 
    progressBar, 
    nextSong, 
    prevSong } = useContext(musicPlayerContext);
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

  return (
    <div className="flex justify-between items-center fixed bottom-0 left-0 z-50 w-full p-1 px-3 bg-gray-700 opacity-[75] space-x-2">
      <div className="flex justify-start items-center w-2/6 space-x-4 py-1">
        <img src={currentSong?.ImgUrl} alt="" className="w-[110px]   " />
        <div className="song-titles">
            <h1 className="text-xl font-semibold text-gray-300 ">{currentSong?.SongTitle}</h1>
            <h3 className="text-xl font-medium text-gray-300">{currentSong?.Artist}</h3>
            <span className="text-sm text-gray-300 ">{currentSong?.Genre}</span>
        </div>
      </div>

      <div className="audio-player w-2/6 text-center">
        <div className="audio-controls space-x-10 py-2">
            <button onClick={prevSong} className="text-gray-300 cursor-pointer">
                <TbPlayerTrackPrev size={35} />
            </button>
            <button onClick={handlePlayPause} className="text-gray-300 cursor-pointer">
                {isPlaying ? <LuPause size={40} /> : <LuPlay size={40} />}
            </button>
            <button onClick={nextSong} className="text-gray-300 cursor-pointer">
                <TbPlayerTrackNext size={35} />
            </button>
        </div>
        <div className="audio-progress w-[95%] mx-auto relative py-2 pb-2">
            <input type="range" min={0} max={audioRef.current?.duration} value={currentTime} onChange={progressBar} className="absolute bottom-2 cursor-pointer h-[3px] rounded-2xl bg-gray-300 appearance-none" style={{ width: '85%',
            margin: '0 auto',
            zIndex: 10,
            padding: 0
             }} />
             <div className="bg-blue-200 h-[3px] w-[85%] absolute bottom-2 left-0 rounded-full" />
             <div
        className="bg-black h-[3px] absolute bottom-2 left-0 rounded-2xl"
        style={{
            width: `${(currentTime / audioRef.current?.duration) * 85}%`, 
            zIndex: 11
        }}
    />
        </div>
      </div>

      <div className="bg-blue-400 w-2/6 rounded-lg p-4 flex items-center justify-between">
    <button className="text-gray-300">
        <LuVolume size={24} />
    </button>
    <input
        type="range"
        name="volume"
        min={0}
        max={100}
        className="w-24 appearance-none bg-gray-300 h-3 rounded-md"
    />
    <div className="cart-buttons flex items-center space-x-4">
        <button className="text-gray-300">
            <TbPlayerPlay size={24} />
        </button>
        <button className="text-gray-300">
            <MdPlaylistAdd size={24} />
        </button>
        <button className="text-gray-300">
            <BsCart3 size={24} />
        </button>
        <span className="text-gray-300">Price</span>
    </div>
</div>

    </div>
  )
}

export default Player
