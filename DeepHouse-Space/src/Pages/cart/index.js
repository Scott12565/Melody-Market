import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { auth } from "../../firebase/firebase";

// to index.js file
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

// to index.js file
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

export { addSongToCarto, removeSongFromCart }