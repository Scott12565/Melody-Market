import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { SongContext } from "../context/songContext";
import { LuPause, LuPlay } from "react-icons/lu";
import { BsCart3 } from "react-icons/bs";
import { RiPlayListLine } from "react-icons/ri";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { Helmet } from "react-helmet-async";
import { cartContext } from "../context/CartContext";
import { AuthContext } from "../context/firebaseContext";
import { musicPlayerContext } from "../context/musicPlayerContext";
import { messageContext } from "../context/messageContext";
import { MdDeleteSweep, MdPlaylistAdd, MdPlaylistRemove } from "react-icons/md";
import { playlistContext } from "../context/PlayListContext";

const LatestSongs = () => {
    const { currentUser } = useContext(AuthContext);
    const { latestSongs } = useContext(SongContext);
    const { musicItems } = useContext(cartContext);
    const { displayMessage } = useContext(messageContext);
    const { currentSong, playPause, isPlaying} = useContext(musicPlayerContext);
    const { playlist } = useContext(playlistContext);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [song, setSong] = useState(null);
    const [playlistState, setPlaylistState] = useState({}); // Object to track each song's playlist status
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        setIsInCart(musicItems?.some(songItem => songItem.songid === song?.songid));
    }, [musicItems, song?.songid]);

    // Function to check if a song is in the playlist and update the state for the specific song
    const checkIfInPlaylist = (song) => {
        setPlaylistState((prevState) => ({
            ...prevState,
            [song.songid]: playlist.some(playlistSong => playlistSong.songid === song.songid),
        }));
    };

    // On initial load, check the playlist status for all songs
    useEffect(() => {
        latestSongs.forEach(checkIfInPlaylist);
    }, [latestSongs, playlist]);

    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % latestSongs.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + latestSongs.length) % latestSongs.length);
    };

    const handleCart = async (song) => {
        setSong(song);
        if (!currentUser) {
            displayMessage('error', 'Please log in before adding songs to the cart.');
            return;
        }
        
        const { addSongToCarto, removeSongFromCart } = await import('../Pages/cart/index');
        if (!isInCart) {
            addSongToCarto(song);
            displayMessage('success', 'Song added to cart');
        } else {
            removeSongFromCart(song.songid);
        }
    };

    const handlePlayPause = (song) => {
        playPause(song);
    };

    const handlePlaylist = async (song) => {
        try {
            const { addToPlayList, removeFromPlayList } = await import('../Pages/playlist/index');
            if (playlistState[song.songid]) {
                await removeFromPlayList(song.songid);
                displayMessage('success', 'Song removed from playlist');
            } else {
                await addToPlayList(song);
                displayMessage('success', 'Song added to playlist');
            }

            // Update the playlist state for the specific song
            setPlaylistState((prevState) => ({
                ...prevState,
                [song.songid]: !playlistState[song.songid],
            }));
        } catch (err) {
            console.log('Failed to add song to playlist! please try again.');
        }
    };

    return ( 
        <>
            <Helmet>
                <title>DeepHouse Space - Latest Songs</title>
                <meta name="description" content="Get our latest deep house track now. It's simple and fast!" />
                <meta name="keywords" content="latest deep house tracks, new deep house releases, fresh deep house music, deephouse space new music" />
                <meta property="og:title" content="DeepHouse Space - Latest Songs" />
                <meta property="og:description" content="Get our latest deep house track now. It's simple and fast!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://deephousespace.web.app/latest" />
            </Helmet>

            <div className="my-1">
                <div className="flex justify-between py-9 px-7">
                    <h3 className="text-gray-300 font-semibold text-xl">Latest Songs</h3>
                    <Link to="/allsongs" className="text-gray-300 text-lg hover:text-blue-500 hover:underline" >
                        see all
                    </Link>
                </div>

                <div className="h-[320px] relative group overflow-hidden">
                    
                    <div className="buttons absolute bottom-4 z-30 space-y-1.5 mx-2">
                        <button onClick={handlePrev} className="prev-btn p-1 bg-yellow-300 text-gray-900 opacity-80 rounded-full hover:bg-yellow-400 transition-transform duration-1000 delay-100 ease-in-out hover:scale-105">
                            <GrFormPreviousLink size={30} />
                        </button>
                        <button onClick={handleNext} className="next-btn p-1 bg-gray-400 text-gray-300 opacity-80 rounded-fullp-1 bg-yellow-300 text-gray-900 opacity-80 rounded-full hover:bg-yellow-400 transition-transform duration-1000 ease-in-out hover:scale-105">
                            <GrFormNextLink size={30} />
                        </button>
                    </div>
                    {
                        latestSongs?.map((song, index) => (
                            <div key={song.songid} className={`w-full h-full bg-blue-700 absolute transition-all duration-500 ease-in-out transform ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'}`}>

                                <div className="absolute top-0 left-0 opacity-40 bg-slate-400 h-full w-full flex justify-center items-center space-x-6 text-xl bg-gray-900 text-black z-10 transition-transform ease-in-out duration-500 scale-0 group-hover:scale-100 cursor-pointer">
                                    <h3 className="cursor-pointer text-yellow-300 transition-transform duration-1000 ease-in-out hover:text-yellow-400 hover:scale-110">
                                        {currentSong?.songid === song.songid && isPlaying ? (
                                            <LuPause size={35} onClick={() => handlePlayPause(song)} />
                                        ) : (
                                            <LuPlay size={35} onClick={() => handlePlayPause(song)} />
                                        )}
                                    </h3>
                                    <h3 className="cursor-pointer text-yellow-300 transition-transform duration-1000 ease-in-out hover:text-yellow-400 hover:scale-110">
                                        {playlistState[song.songid] ? (
                                            <MdPlaylistRemove size={35} onClick={() => handlePlaylist(song)} className="text-red-600" />
                                        ) : (
                                            <MdPlaylistAdd size={35} onClick={() => handlePlaylist(song)} className="text-yellow-200 hover:text-yellow-100" />
                                        )}
                                    </h3>
                                    <h3 className="cursor-pointer text-yellow-300 transition-transform duration-1000 ease-in-out hover:text-yellow-400 hover:scale-110">
                                        {isInCart ? (
                                            <MdDeleteSweep size={35} onClick={() => handleCart(song)} className="cursor-pointer" />
                                        ) : (
                                            <BsCart3 size={35} onClick={() => handleCart(song)} className="cursor-pointer" />
                                        )}
                                    </h3>
                                </div>

                                <div className="text-gray-300 text-xl text-center absolute top-0 left-0 w-full h-full" style={{ 
                                    backgroundImage: `url(${song.ImgUrl})`,
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover'
                                }}>
                                    <p>{song.SongTitle} by {song.Artist}</p>
                                </div>
                                
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default LatestSongs;
