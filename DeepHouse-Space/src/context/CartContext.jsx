import { createContext, useState } from "react";

export const cartContext = createContext();

const CartContextProvider = ({children}) => {
    const [musicItems, setMusicItems] = useState([]);

    return (
        <cartContext.Provider value={{}} >
            {children}
        </cartContext.Provider>
    );
}
 
export default CartContextProvider;