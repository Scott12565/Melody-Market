import { useContext, useState, useEffect } from "react";
import { musicPlayerContext } from "../context/musicPlayerContext";
import { LuPause, LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { MdPlaylistAdd, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { formatCurrency } from "../utils/currencyformater";

const Player = () => {
  const {
    currentSong,
    isPlaying,
    playPause,
    currentTime,
    audioRef,
    progressBar,
    nextSong,
    prevSong,
  } = useContext(musicPlayerContext);

  const [isCollapsed, setIsCollapsed] = useState(true);

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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`fixed bottom-0 left-0 z-50 w-screen p-1 px-3 bg-[#0E1411] opacity-[75] transition-all duration-300 ease-in-out ${isCollapsed ? 'h-12' : 'h-auto'} ${currentSong ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex justify-between items-center w-full">
        <button onClick={toggleCollapse} className="text-gray-300">
          {isCollapsed ? <MdKeyboardArrowUp size={24} /> : <MdKeyboardArrowDown size={24} />}
        </button>
        {!isCollapsed && (
          <div className="flex flex-col md:flex-row justify-start items-start w-full">
            <div className="flex justify-start items-center w-full space-x-4 py-1 md:w-2/6">
              <img src={currentSong?.ImgUrl} loading="lazy" alt="" className="hidden w-24 h-24 rounded-lg md:w-[110px] md:h-[90px] md:block" />
              <div className="song-titles flex items-center justify-between w-full md:flex-col md:items-start">
                <h1 className="text-[17px] font-semibold text-gray-300 md:text-[16px] lg:text-[20px]">{currentSong?.SongTitle}</h1>
                <h3 className="text-[17px] font-medium text-gray-300 md:text-[14px] lg:text-[18px]">{currentSong?.Artist}</h3>
                <span className="text-[13px] text-gray-300 lg:text-[17px]">{currentSong?.Genre}</span>
              </div>
            </div>

            <div className="audio-player w-full sm:w-2/6 text-center lg:space-y-2">
              <div className="flex justify-center items-center space-x-5 py-2">
                <div className="audio-controls w-1/2 flex justify-start space-x-4 lg:justify-center">
                  <button onClick={prevSong} className="text-[24px] text-gray-300 cursor-pointer md:text-[27px] lg:text-[35px]">
                    <TbPlayerTrackPrev />
                  </button>
                  <button onClick={handlePlayPause} className="text-[29px] text-gray-300 cursor-pointer md:text-[34px] lg:text-[39px]">
                    {isPlaying ? <LuPause /> : <LuPlay className="text-[#f9e165]"/>}
                  </button>
                  <button onClick={nextSong} className="text-[24px] text-gray-300 cursor-pointer md:text-[27px] lg:text-[35px]">
                    <TbPlayerTrackNext />
                  </button>
                </div>
                <div className="bg-[#F9E165] text-center rounded-lg p-2 sm:p-4 flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 md:hidden">
                  <div className="cart-buttons flex items-center space-x-2 sm:space-x-4">
                    <button className="text-[24px] text-gray-800 md:text-[35px]">
                      <MdPlaylistAdd />
                    </button>
                    <button className="text-[24px] text-gray-800 md:text-[35px]">
                      <BsCart3 />
                    </button>
                    <span className="text-[16px] text-gray-300 bg-gray-800 md:text-[20px]">{formatCurrency(currentSong?.Price)}</span>
                  </div>
                </div>
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
                <div className="bg-[#8C4096] h-[3px] w-full absolute bottom-2 left-0 rounded-full" />
                <div
                  className="bg-black h-[3px] absolute bottom-2 left-0 rounded-2xl"
                  style={{
                    width: `${(currentTime / audioRef.current?.duration) * 100}%`,
                    zIndex: 11
                  }}
                />
              </div>
            </div>
            <div className="hidden bg-[#F9E165] text-center rounded-lg p-2 pt-2 flex flex-col sm:flex-row items-center justify-between space-y-2 md:space-y-5 md:block">
              <div className="cart-buttons flex items-center space-x-2 md:space-x-3">
                <button className="text-[24px] text-gray-800 md:text-[27px]">
                  <MdPlaylistAdd />
                </button>
                <button className="text-[24px] text-gray-800 md:text-[27px]">
                  <BsCart3 />
                </button>
                <span className="text-[18px] text-gray-300 bg-gray-800 opacity-95 p-1 md:text-[19px]">{formatCurrency(currentSong?.Price)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Player;
