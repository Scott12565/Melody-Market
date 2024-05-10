import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SongContext = createContext();

const SongcontextProvider = ({ children }) => {
    const [allSongs, setAllSongs] = useState([]);
    const [latestSongs, setLatestSongs] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showSideBar, setShowSideBar] = useState(false);

    const handleSideBar = () => {
        setShowSideBar(!showSideBar);
        // console.log(showSideBar);
    };

    useEffect(() => {
        axios.get('/database/songs.json')
            .then(response => {
                const data = response.data;
                const musicData = data.songData.allSongs;

                const latestSong = musicData.filter(song => {
                    return song.latest ? song : setError("Couldn't load latest songs");
                });
                const topSong = musicData.filter(song => {
                    return song.top ? song : setError("Couldn't load top songs");
                });

                setTopSongs(topSong);
                setLatestSongs(latestSong);
                setAllSongs(musicData);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setIsLoading(false);
            });
    }, []);

    const contextValue = {
        allSongs,
        latestSongs,
        topSongs,
        error,
        isLoading,
        showSideBar,
        handleSideBar
    };

    return (
        <SongContext.Provider value={contextValue}>
            {children}
        </SongContext.Provider>
    );
};

export default SongcontextProvider;
