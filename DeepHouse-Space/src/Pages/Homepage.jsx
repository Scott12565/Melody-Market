import AllSongs from "../Songs/AllSongs";
import LatestSongs from "../Songs/LatestSongs";
import Recommendedsongs from "../Songs/RecommendeSongs";
import TopSongs from "../Songs/TopSongs";
import SideBar from "../components/SideBar/SideBar";
const Home = () => {
    return ( 
        <section className="pb-5">
            <div className="">
                <LatestSongs />
            </div>
            <div>
                <AllSongs />
            </div>
        
        </section>
     );
}
 
export default Home;