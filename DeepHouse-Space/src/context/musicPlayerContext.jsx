import { createContext, useContext, useState } from "react";
import { cartContext } from "./CartContext";

export const musicPlayerContext = createContext();

const MusicPlayerContextProvider = ({ children }) => {
    

    return ( 
        <musicPlayerContext.Provider value={{}} >
            {children}
        </musicPlayerContext.Provider>
     );
}
 
export default MusicPlayerContextProvider;