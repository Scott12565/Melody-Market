import { createContext,useContext, useState } from "react";


export const cartContext = createContext();

const CartContextProvider = ({children}) => {
    // const { songAlreadyInCart } = useState(false);
    const [musicItems, setMusicItems] = useState([]);
    
    const addSongToCart = (song) => {
        // Check if the song is already in the cart based on its id       
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
        }
    };

    const removeSongFromCart = (id) => {
        setMusicItems(musicItems.filter(song => song.songid !== id));
        console.log('song removed from cart');
    }


    return (
        <cartContext.Provider value={{ addSongToCart, musicItems, removeSongFromCart }} >
            {children}
        </cartContext.Provider>
    );
}
 
export default CartContextProvider;