import AllSongs from "../Songs/AllSongs";
import LatestSongs from "../Songs/LatestSongs";

const Home = () => {
    return ( 
        <section className="pb-5">
            <div className="hidden lg:block">
                <LatestSongs />
            </div>
            <div>
                <AllSongs />
            </div>
        
        </section>
     );
}
 
export default Home;