import { useContext } from "react";
import AllSongs from "../Songs/AllSongs";
import LatestSongs from "../Songs/LatestSongs";
import { SongContext } from "../context/songContext";
import FilteredSongs from "../components/FilteredSoongs";
const Home = () => {
    const { filteredSongs } = useContext(SongContext);

    return ( 
        <section className="pb-5">
            {filteredSongs?.length > 0 ? (
                <FilteredSongs />
            ) : (
                <>
                    <div className="hidden lg:block">
                        <LatestSongs />
                    </div>
                    <div>
                        <AllSongs />
                    </div>
                </>
            )}
        </section>
     );
}
 
export default Home;
