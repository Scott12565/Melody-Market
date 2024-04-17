import Navbar from "../Shared/Header/Navbar";
import SideBar from "../SideBar/SideBar";
import SongsList from "../Songs/SongsList";
import TopSongs from "../Songs/TopSongs";

const HomePage = () => {
    return ( 
        <div className="bg-red-300 h-full">
            
            <div className="flex justify-between items-start md:w-10/12 mx-auto h-full">
                <SideBar />
                <SongsList />
                <TopSongs />
            </div>
        </div>
     );
}
 
export default HomePage;