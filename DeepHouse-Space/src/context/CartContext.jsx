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
            console.log(musicItems)
        }
    };
    
    // if(musicItems.find(songItem => songItem.songid === song.songid)){
    //        console.log('song already in cart');
    //        return;
    //     } else {
    //         // Add the song to the cart
    //         setMusicItems(prevItems => [...prevItems, song]);
    //         console.log('Song added to cart:', song);
    //         console.log('Current music items:', musicItems);
    //     }

    const contextValue = {
        addSongToCart,
    }

    return (
        <cartContext.Provider value={{ addSongToCart, musicItems }} >
            {children}
        </cartContext.Provider>
    );
}
 
export default CartContextProvider;