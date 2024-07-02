import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";

export const playlistContext = createContext();

const PlayListContextProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState([]);

    const addToPlayList = async (song) => {
        const userId = auth.currentUser?.uid;
        try {
            const collectionRef = collection(db, `users/${userId}/Playlist`);
            const querySnapshot = await getDocs(collectionRef);
            const existingSong = querySnapshot.docs.find(songItem => songItem.data().song.songid === song.songid);

            if (existingSong) {
                console.log('Song already in playlist', song);
            } else {
                await addDoc(collectionRef, { song });
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            const collectionRef = collection(db, `users/${userId}/Playlist`);
            const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
                const playlist = snapshot.docs.map(songItem => ({
                    id: songItem.id,
                    ...songItem.data().song
                }));
                setPlaylist(playlist);
            });
            return () => unsubscribe();
        }
    }, [auth.currentUser?.uid]);

    const removeFromPlayList = async (songId) => {
        const userId = auth.currentUser?.uid;
        try {
            const collectionRef = collection(db, `users/${userId}/Playlist`);
            const querySnapshot = await getDocs(collectionRef);
            const listItem = querySnapshot.docs.find(songItem => songItem.data().song.songid === songId);
            if (listItem) {
                await deleteDoc(doc(db, `users/${userId}/Playlist/${listItem.id}`));
                setPlaylist(prev => prev.filter(song => song.songid !== songId));
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <playlistContext.Provider value={{ playlist, addToPlayList, removeFromPlayList }}>
            {children}
        </playlistContext.Provider>
    );
}

export default PlayListContextProvider;
