import SideBar from "../SideBar/SideBar";
import SongsList from "../Songs/SongsList";
import TopSongs from "../Songs/TopSongs";

const HomePage = () => {
    return ( 
        <div className="min-h-screen ">
            
            <div className="flex justify-between items-start md:w-10/12 mx-auto h-full">
                <SideBar />
                <SongsList />
                <TopSongs />
            </div>
        </div>
     );
}
 
export default HomePage;