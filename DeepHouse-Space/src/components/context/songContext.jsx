import axios from "axios";
import { useState, useEffect, createContext } from "react";

export const SongContext = createContext();

function SongcontextProvider({children}) {

    const [allSongs, setAllSongs] = useState([]);
    const [latestSongs, setLatestSongs] = useState([]);
    const [topSongs, setTopSongs] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('/database/songs.json')
            .then(response => {
                const data = response.data;
                const musicData = data.songData.allSongs;

                const latestSong = musicData.filter(song => {
                    return song.latest ? song : setError("couldn't load song");
                });
                const topSong = musicData.filter(song => {
                    return song.top ? song : error;
                });
                setTopSongs(topSong)
                setLatestSongs(latestSong);
                setAllSongs(musicData); 
            })
            .catch(error => {
                setError(error.message);
                console.log(error.message);
            });
            
    }, []);

    return ( 
<SongContext.Provider value={{allSongs, latestSongs, topSongs, error, isLoading}} >
    {children}
</SongContext.Provider>
     );
}

export default SongcontextProvider;