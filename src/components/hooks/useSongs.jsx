import { useState, useEffect } from "react";
function useSong () {

    const [allSongs, setAllSongs] = useState([]);

    useEffect(() => {

    }, [allSongs])
    return ( 
        <div>this is a songs hook</div>
     );
}

export default useSong ;