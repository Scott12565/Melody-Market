import { useContext } from "react";
import AllSongs from "../Songs/AllSongs";
import LatestSongs from "../Songs/LatestSongs";
import { SongContext } from "../context/songContext";
import FilteredSongs from "../components/FilteredSoongs";
import { Helmet } from "react-helmet-async";
const Home = () => {
    const { filteredSongs } = useContext(SongContext);

    return ( 

        <>
        <Helmet >
            <title>DeepHouse Space - Home</title>
            <meta name="description" content="Discover the latest and top deep house tracks on DeepHouse Space. Explore curated playlists, filtered songs, and more to elevate your music experience." />
            <meta name="keywords" content="deep house, music discovery, top tracks, latest songs, curated playlists, music experience" />
            <meta property="og:title" content="DeepHouse Space - Home" />
            <meta property="og:description" content="Discover the latest and top deep house tracks on DeepHouse Space. Explore curated playlists, filtered songs, and more to elevate your music experience." />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://deephousespace.web.app/" />
        </Helmet>
        <section className="pb-5">
            { filteredSongs?.length > 0 ? (
                filteredSongs.map(filteredSong => (
                    <FilteredSongs song={filteredSong} />
                ))
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
        </>
        
     );
}
 
export default Home;
