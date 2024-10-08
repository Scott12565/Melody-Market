import { useContext } from "react";
import { LuPause, LuPlay } from "react-icons/lu";
import { MdDeleteSweep } from "react-icons/md";
import { musicPlayerContext } from "../../context/musicPlayerContext";
import { playlistContext } from "../../context/PlayListContext";
import { Helmet } from "react-helmet-async";
import { formatCurrency } from "../../utils/currencyformater";
import { messageContext } from "../../context/messageContext";

const PlayList = () => {
    const { playlist } = useContext(playlistContext);
    const { currentSong, playPause, isPlaying } = useContext(musicPlayerContext);
    const { displayMessage } = useContext(messageContext);

    const handlePlayPause = (song) => {
        playPause(song);
    };

    const handleRemoveFromPlaylist = async (songid) => {
        try {
            // Adjust the path to the correct relative path
            const { removeFromPlayList } = await import('./index');
            removeFromPlayList(songid);
            displayMessage('success', 'Song removed from playlist');
        } catch (err) {
            console.log('Failed to romeve song from playlist! please try agin.');
        }
    }

    return (
        <>
            <Helmet >
            <title>DeepHouse Space - My Playlist</title>
                <meta name="description" content="View and manage your playlist with your favorite deep house tracks. Add, remove, or play songs from your playlist." />
                <meta name="keywords" content="deep house, playlist, manage playlist, favorite songs, music player" />
                <meta property="og:title" content="DeepHouse Space - My Playlist" />
                <meta property="og:description" content="View and manage your playlist with your favorite deep house tracks. Add, remove, or play songs from your playlist." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://deephousespace.web.app/playlist" />
            </Helmet>
            <div className="playlist">
                <div className="text-gray-300 text-lg font-medium my-1 mx-4 p-2 md:my-9 flex justify-between items-center md:text-xl lg:my-5 lg:mx-5">
                    <h3 className="text-xl md:text-2xl lg:text-3xl">Playlist</h3>
                </div>

                {playlist.length === 0 ? (
                    <div className="text-white text-center mt-10">
                        Your playlist is empty. Add some songs to get started!
                    </div>
                ) : (
                    <div className="w-full">
                        {playlist.map((song, index) => (
                            <div key={song.songid} className="flex flex-1 justify-start items-center bg-blue-20 w-[98%] mx-auto space-x-1 text-gray-300 border-b py-4 transition-all transform scale-95 hover:scale-100 cursor-pointer md:space-x-3.5">
                                <span className="text-2xl">{index + 1}.</span>
                                <img src={song?.ImgUrl} loading="lazy" alt={`cover image for ${song.SongTitle} song`} className="hidden md:block w-[150px] rounded-sm" />
                                <div className="flex items-center justify-start w-full">
                                    <div className="flex flex-1 items-center justify-between py-2 px-1.5">
                                        <div>
                                            <h2 className="text-[1.1rem]">
                                                {song?.SongTitle}
                                            </h2>
                                            <h3 className="text-[1.1rem]">
                                                {song?.Artist}
                                            </h3>
                                        </div>

                                        <div className="flex flex-col text-[1rem]">
                                            <p className="hidden md:block">{song?.Genre}</p>
                                            <p className="text-[#0E1411] bg-[#F9E165] cursor-pointer p-1 rounded-md">{formatCurrency(song?.Price)}</p>
                                        </div>

                                        <div className="flex items-center space-x-1">
                                            <h1 className="text-yellow-200 hover:text-yellow-100">
                                                {currentSong?.songid === song.songid && isPlaying ? (
                                                    <LuPause size={22} onClick={() => handlePlayPause(song)} className="cursor-pointer" />
                                                ) : (
                                                    <LuPlay size={22} onClick={() => handlePlayPause(song)} className="cursor-pointer" />
                                                )}
                                            </h1>
                                            <h1 className="text-orange-400 hover:text-orange-600">
                                                <MdDeleteSweep size={30} onClick={() => handleRemoveFromPlaylist(song.songid) } className="cursor-pointer" />
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
        
    );
};

export default PlayList;
