import { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, getDocs, doc, deleteDoc, onSnapshot } from "firebase/firestore";

export const cartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [musicItems, setMusicItems] = useState([]);

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            const collectionRef = collection(db, `users/${userId}/songCollection`);
            const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
                const songItems = snapshot.docs.map((songDoc) => {
                    console.log(songDoc);
                    return {
                        id: songDoc.id,
                        ...songDoc.data().song
                    }
                });
                setMusicItems(songItems);
            });

            return () => unsubscribe();
        }
    }, [auth.currentUser?.uid]);

    const addSongToCarto = async (song) => {
        const userId = auth.currentUser.uid;
        try {
            const collectionRef = collection(db, `users/${userId}/songCollection`);
            const querySnapshot = await getDocs(collectionRef);

            const existingSong = querySnapshot.docs.find(songDoc => songDoc.data().song.songid === song.songid);

            if (existingSong) {
                console.log('Song already in collection:', song);
            } else {
                await addDoc(collectionRef, { song });
            }
        } catch (err) {
            console.log('Error adding song to cart:', err.message);
        }
    };

    const removeSongFromCart = async (songId) => {
        const userId = auth.currentUser.uid;
        try {
            const collectionRef = collection(db, `users/${userId}/songCollection`);
            const querySnapshot = await getDocs(collectionRef);

            const songDoc = querySnapshot.docs.find(songDoc => songDoc.data().song.songid === songId);
            if (songDoc) {
                await deleteDoc(doc(db, `users/${userId}/songCollection/${songDoc.id}`));
            }
        } catch (err) {
            console.log('Error removing song from cart:', err);
        }
    };

    return (
        <cartContext.Provider value={{ addSongToCarto, musicItems, removeSongFromCart }}>
            {children}
        </cartContext.Provider>
    );
};

export default CartContextProvider;
