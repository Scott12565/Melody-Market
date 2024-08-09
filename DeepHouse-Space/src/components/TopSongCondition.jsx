import { Suspense } from "react";
import Loaders from "./Loaders";
import TopSong from "./TopSong";
import { useLocation } from "react-router-dom";

const TopSongConditional = () => {
    const loaction = useLocation();
    if(loaction.pathname === "/collection" || loaction.pathname === "/playlist"){
        return null;
    }
    return ( 
        <Suspense fallback={<Loaders />} >
            <TopSong />
        </Suspense>
     );
}
 
export default TopSongConditional;