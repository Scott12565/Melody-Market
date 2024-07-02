import { createContext, useState, useEffect } from 'react';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
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
            const collectionRef = collection(db, 'songsData');

            const unsubscribe = onSnapshot(collectionRef, (snapShot) => {
                const musicData = snapShot.docs.map(songDoc => ({
                    id: songDoc.id,
                    ...songDoc.data()
                }));

                setAllSongs(musicData);
                const latestSong = musicData.filter(song => song.latest ? song : setError("Couldn't load latest songs"));
                const topSong = musicData.filter(song => song.top ? song : setError("Couldn't load top songs")
                )
                setTopSongs(topSong);
                setLatestSongs(latestSong);
                setIsLoading(false);
            });

            
        // console.log(musicData);
       
        return () => unsubscribe();

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
