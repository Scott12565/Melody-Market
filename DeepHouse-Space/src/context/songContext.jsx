import { createContext, useState, useEffect } from 'react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

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
    };

    const getSongs = async () => {
        try {
            const querySnapShot = await getDocs(collection(db, 'songsData'));
            const musicData = querySnapShot.docs.map(song => {
            return {
                id: song.id,
                ...song.data()
            }
        })
        setAllSongs(musicData);
        // console.log(musicData);
        const latestSong = musicData.filter(song => song.latest ? song : setError("Couldn't load latest songs"));
        const topSong = musicData.filter(song => song.top ? song : setError("Couldn't load top songs")
        )
        setTopSongs(topSong);
        setLatestSongs(latestSong);
        setIsLoading(false);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getSongs();
    }, [])

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
