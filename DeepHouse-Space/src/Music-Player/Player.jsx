import { useContext, useEffect } from "react";
import { musicPlayerContext } from "../context/musicPlayerContext";
import { LuPause, LuPlay, LuVolume } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdDeleteSweep, MdPlaylistAdd } from "react-icons/md";
import { TbPlayerPlay, TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

const Player = () => {
  const {
    currentSong,
    isPlaying,
    playPause,
    setCurrentTime,
    currentTime,
    audioRef,
    progressBar,
    nextSong,
    prevSong,
  } = useContext(musicPlayerContext);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  const handlePlayPause = () => {
    playPause(currentSong);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center fixed bottom-0 left-0 z-50 w-screen p-1 px-3 bg-gray-700 opacity-[75] space-y-2 sm:space-y-0 sm:space-x-2">
      <div className="flex justify-start items-center w-full sm:w-2/6 space-x-4 py-1">
        <img src={currentSong?.ImgUrl} alt="" className="w-24 h-24 sm:w-[110px] sm:h-[110px] rounded-lg" />
        <div className="song-titles">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-300">{currentSong?.SongTitle}</h1>
          <h3 className="text-md sm:text-xl font-medium text-gray-300">{currentSong?.Artist}</h3>
          <span className="text-sm text-gray-300">{currentSong?.Genre}</span>
        </div>
      </div>

      <div className="audio-player w-full sm:w-2/6 text-center">
        <div className="audio-controls flex justify-center space-x-4 sm:space-x-10 py-2">
          <button onClick={prevSong} className="text-gray-300 cursor-pointer">
            <TbPlayerTrackPrev size={30} sm:size={35} />
          </button>
          <button onClick={handlePlayPause} className="text-gray-300 cursor-pointer">
            {isPlaying ? <LuPause size={35} sm:size={40} /> : <LuPlay size={35} sm:size={40} />}
          </button>
          <button onClick={nextSong} className="text-gray-300 cursor-pointer">
            <TbPlayerTrackNext size={30} sm:size={35} />
          </button>
        </div>
        <div className="audio-progress w-[90%] sm:w-[95%] mx-auto relative py-2 pb-2">
          <input
            type="range"
            min={0}
            max={audioRef.current?.duration}
            value={currentTime}
            onChange={progressBar}
            className="absolute bottom-2 cursor-pointer h-[3px] rounded-2xl bg-gray-300 appearance-none"
            style={{
              width: '100%',
              margin: '0 auto',
              zIndex: 10,
              padding: 0
            }}
          />
          <div className="bg-blue-200 h-[3px] w-full absolute bottom-2 left-0 rounded-full" />
          <div
            className="bg-black h-[3px] absolute bottom-2 left-0 rounded-2xl"
            style={{
              width: `${(currentTime / audioRef.current?.duration) * 100}%`,
              zIndex: 11
            }}
          />
        </div>
      </div>

      <div className="bg-blue-400 w-full sm:w-2/6 rounded-lg p-2 sm:p-4 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="text-gray-300">
            <LuVolume size={20} />
          </button>
          <input
            type="range"
            name="volume"
            min={0}
            max={100}
            className="w-8 sm:w-32 appearance-none bg-gray-300 h-2 rounded-md"
          />
        </div>
        <div className="cart-buttons flex items-center space-x-2 sm:space-x-4">
         
          <button className="text-gray-300">
            <BsCart3 size={20} />
          </button>
          <span className="text-gray-300 text-sm">Price</span>
        </div>
      </div>
    </div>
  );
};

export default Player;
