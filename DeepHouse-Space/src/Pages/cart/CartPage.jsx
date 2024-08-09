import { useContext } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { MdDeleteSweep, MdPlaylistAdd, MdPlaylistRemove } from "react-icons/md";
import { musicPlayerContext } from "../../context/musicPlayerContext";
import { playlistContext } from "../../context/PlayListContext";
import { formatCurrency } from "../../utils/currencyformater";

const CartPage = ({ song, index }) => {
    const { currentSong, playPause, isPlaying } = useContext(musicPlayerContext);
    const { playlist } = useContext(playlistContext);

    const handlePlayPause = (song) => {
        playPause(song);
    };

    const isSongInPlaylist = (songId) => {
        return playlist.some(song => song.songid === songId);
    };

    const handleAddToPlayList = async (song) => {
        try {
            const { addToPlayList } = await import('../playlist/index')
            addToPlayList(song)
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleRemoveFromPlayList = async (songid) => {
        try {
            const { removeFromPlayList } = await import("../playlist/index");
            removeFromPlayList(songid)
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="">
            
            <div className="w-full">
                
                <div className="flex flex-1 justify-start items-center bg-blue-20 w-[98%] mx-auto space-x-2.5 text-gray-300 border-b py-4 transition-all transform scale-95 hover:scale-100 cursor-pointer md:space-x-3.5 ">
                    <span className="text-2xl">{index + 1}.</span>
                    <img src={song?.ImgUrl} loading="lazy" alt={`cover image for ${song.SongTitle} by ${song.Artist} song`} className="hidden md:block w-[150px] rounded-sm" />
                    <div className="flex items-center justify-start w-full ">
                        <div className="flex flex-1 items-center justify-between py-[2px] px-1.5">
                            <div>
                                <h2 className="text-[16px] md:lg">
                                    {song?.SongTitle}
                                </h2>
                                <h3 className="text-[16px] md:lg">
                                    {song?.Artist}
                                </h3>
                            </div>

                            <div className="flex space-x-3 text-[16px] md:[17px] ">
                                <p>{song?.Genre}</p>
                                <p className="text-yellow-500">{formatCurrency(song?.Price)}</p>
                            </div>

                            <div className="flex items-start space-x-3">
                                
                                <h1>
                                    {isSongInPlaylist(song.songid) ? (
                                        <MdPlaylistRemove size={27} onClick={() => handleRemoveFromPlayList(song.songid)} className="text-red-600" />
                                    ) : (
                                        <MdPlaylistAdd size={27} onClick={() => handleAddToPlayList(song)} className="text-yellow-200 hover:text-yellow-100" />
                                    )}
                                </h1>
                                <h1 className="text-yellow-200 hover:text-yellow-100">
                                    {currentSong?.songid === song?.songid && isPlaying ? (
                                        <LuPause size={26} onClick={() => handlePlayPause(song)} className="cursor-pointer" />
                                    ) : (
                                        <LuPlay size={26} onClick={() => handlePlayPause(song)} className="cursor-pointer" />
                                    )}
                                </h1>
                                <h1 className="cursor-pointer" onClick={() => handleRemoveFromPlayList(song.songid)}>
                                    <MdDeleteSweep size={27} className="text-red-600" />
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
