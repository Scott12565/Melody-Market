import axios from "axios";
import { useState, useEffect } from "react";

function useSong() {
    const [allSongs, setAllSongs] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('/database/songs.json')
            .then(response => {
                const data = response.data;
                const musicData = data.songData.allSongs;
                console.log(musicData);
                setAllSongs(musicData); 
            })
            .catch(error => {
                setError(error.message);
                console.log(error.message);
            });
    }, []);

    return { allSongs, error };
}

export default useSong;
