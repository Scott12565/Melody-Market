import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import AuthContextProvider from "./context/firebaseContext";
import CartContextProvider from "./context/CartContext";
import MusicPlayerContextProvider from "./context/musicPlayerContext";
import PlayListContextProvider from "./context/PlayListContext";
import SideBar from "./components/SideBar/SideBar";
import Navbar from "./components/Shared/Header/Navbar";
import Player from "./Music-Player/Player";
import Loaders from "./components/Loaders";
import { SongContext } from "./context/songContext";

const Home = lazy(() => import("./Pages/Homepage"));
const SignIn = lazy(() => import("./UserAccounts/SignIn"));
const SignUp = lazy(() => import("./UserAccounts/SignUp"));
const PasswordReset = lazy(() => import("./UserAccounts/PasswordReset"));
const AllSongs = lazy(() => import("./Songs/AllSongs"));
const TopSongs = lazy(() => import("./Songs/TopSongs"));
const PlayList = lazy(() => import("./Pages/playlist/PlayList"));
const Collections = lazy(() => import("./Pages/Colections"));

function App() {
  const { showSideBar } = useContext(SongContext);
  
  return (
    <AuthContextProvider>
      <PlayListContextProvider >
        <CartContextProvider>
          <MusicPlayerContextProvider>
          
            <Router>
            <Suspense fallback={<Loaders />} >
              <div className="App flex flex-col">
                <Navbar />
                
                <div className="flex flex-1 h-[calc(100vh - 80px)] gap-5">
                  <div className={`sidebar fixed top-0 left-0 z-50 h-full transition-all duration-200 ease-in-out transform ${showSideBar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:static lg:h-[auto]`}>
                    <SideBar />
                  </div>
                  
                  <div className="flex flex-col-reverse w-full gap-5 lg:flex-row">
                    <div className="w-[90%] mx-auto lg:w-[73%]">
                      <Switch>
                        <Route path="/" exact>
                          <Home />
                        </Route>
                        <Route path="/allsongs">
                          <AllSongs />
                        </Route>
                        <Route path="/collection">
                          <Collections />
                        </Route>
                        <Route path="/playlist" >
                          <PlayList />
                        </Route>
                        <Route path="/signin">
                          <SignIn />
                        </Route>
                        <Route path="/signup">
                          <SignUp />
                        </Route>
                        <Route path="/resetpassword">
                          <PasswordReset />
                        </Route>
                      </Switch>
                    </div>
                    <div className="w-[90%] mx-auto lg:w-[40%] xl:w-[27%]">
                      <TopSongs />
                    </div>
                  </div>
                </div>
                <Player />
                
              </div>
            </Suspense>
            </Router>

          </MusicPlayerContextProvider>
        </CartContextProvider>
      </PlayListContextProvider>
     
    </AuthContextProvider>
  );
}

export default App;
