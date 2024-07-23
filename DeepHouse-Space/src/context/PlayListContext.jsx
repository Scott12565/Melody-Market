import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { collection,  onSnapshot } from "firebase/firestore";

export const playlistContext = createContext();

const PlayListContextProvider = ({ children }) => {
    const [playlist, setPlaylist] = useState([]);
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

    return (
        <playlistContext.Provider value={{ playlist }}>
            {children}
        </playlistContext.Provider>
    );
}

export default PlayListContextProvider;
