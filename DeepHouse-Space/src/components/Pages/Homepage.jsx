import SideBar from "../SideBar/SideBar";
import LatestSongs from "../Songs/LatestSongs";
import TopSongs from "../Songs/TopSongs";

const HomePage = () => {
    return ( 
        <section className="h-dvh pb-5">
            
            <div className="flex justify-between items-start md:w-10/12 mx-auto h-full ">
                <SideBar />
                <LatestSongs />
                <TopSongs />
            </div>
        </section>
     );
}
 
export default HomePage;