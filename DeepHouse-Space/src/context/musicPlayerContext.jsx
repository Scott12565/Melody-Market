import { Children, createContext, useContext, useState } from "react";
import { cartContext } from "./CartContext";

export const musicPlayerContext = createContext();

const MusicPlayerContextProvider = ({ children }) => {
    const { musicItems } = useContext(cartContext);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    const playpuase = () => {
        if(isPlaying){
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
         
        };
    };

    const addToRemoveFromCart = (song) => {
       setIsInCart(prevSongItem => ({
        ...prevSongItem,
        [song.songid]: !prevSongItem[song.songid]
    }));
    };

    return ( 
        <musicPlayerContext.Provider value={{isPlaying, playpuase, isInCart, addToRemoveFromCart}} >
            {children}
        </musicPlayerContext.Provider>
     );
}
 
export default MusicPlayerContextProvider;