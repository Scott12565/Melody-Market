import { createContext } from "react";

export const SongsContext = createContext();

const SongsContextProvider = ({ props }) => {

    // initial state
    return ( 
        <SongsContext.Provider value={{}} >
            {props.children}
        </SongsContext.Provider>
     );
}
 
export default SongsContextProvider;