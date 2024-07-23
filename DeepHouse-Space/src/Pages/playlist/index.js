import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";


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

export { addToPlayList, removeFromPlayList }