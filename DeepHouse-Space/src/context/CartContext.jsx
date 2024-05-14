import { createContext,useContext, useState } from "react";


export const cartContext = createContext();

const CartContextProvider = ({children}) => {
    // const { songAlreadyInCart } = useState(false);
    const [musicItems, setMusicItems] = useState([]);
    
    const addSongToCart = (song) => {
       let isSongInCart = false;
       musicItems.forEach(songItem => {
        if(songItem.id === song.songid){
            isSongInCart = true
            console.log('song already in cart', musicItems)
        }
       });

       setMusicItems([...musicItems, song]);
        console.log(musicItems)
       
    //     const isSongInCart = musicItems.some(songItem => songItem.id === song.songid);
    
    //     if (isSongInCart) {
    //         console.log('Song already in cart');
    //     } else {
            
    //         setMusicItems(prevItems => [...prevItems, song]);
    //         console.log('Song added to cart:', song);
    //     }
};
    
    
    

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