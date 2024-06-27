import { createContext, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";


export const cartContext = createContext();

const CartContextProvider = ({children}) => {
    // const { songAlreadyInCart } = useState(false);
    const [musicItems, setMusicItems] = useState([]);
    
    const addSongToCart = (song) => {
       
        let isSongInCart = false;
        musicItems.forEach(songItem => {
         if(songItem.songid === song.songid){
             isSongInCart = true;
             console.log('song already in cart', songItem);
             return;
         }
        });
        
        if(!isSongInCart){
            setMusicItems([...musicItems, song]);
            console.log(musicItems);
            // console.log(auth.currentUser.uid);
        }
    };

    const addSongToCarto = async (song) => {
        const userId = auth.currentUser.uid;

        try {

            const collectionRef = collection(db, `users/${userId}/songCollection`);
            const querySnapshot = await getDocs(collectionRef);

            const existingSong = querySnapshot.docs.find(songDoc => songDoc.data().song.id === song.id);

            if(existingSong){
                console.log('song already in collection', song);
            } else {
                await addDoc(collectionRef, { song });
                
                const querySnapShot = await getDocs(collection(db, `users/${userId}/songCollection`));

                const songItem = querySnapShot.docs.map(songDoc => ({
                    id: songDoc.id,
                    ...songDoc.data()
                }));

                setMusicItems([...musicItems, songItem]);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const removeSongFromCart = (id) => {
        setMusicItems(musicItems.filter(song => song.songid !== id));
        console.log('song removed from cart');
    }


    return (
        <cartContext.Provider value={{ addSongToCarto, musicItems, removeSongFromCart }} >
            {children}
        </cartContext.Provider>
    );
}
 
export default CartContextProvider;