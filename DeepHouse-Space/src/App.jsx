import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Homepage";
import AuthContextProvider from "./context/firebaseContext";
import PasswordReset from "./UserAccounts/PasswordReset";
import SongcontextProvider, { SongContext } from "./context/songContext";
import SignIn from "./UserAccounts/SignIn";
import SignUp from "./UserAccounts/SignUp";
import SideBar from "./components/SideBar/SideBar";
import AllSongs from "./Songs/AllSongs";
import TopSongs from "./Songs/TopSongs";
import Navbar from "./components/Shared/Header/Navbar";
import { useContext } from "react";
import CartPage from "./Pages/cart/CartPage";
import CartContextProvider from "./context/CartContext";
import MusicPlayerContextProvider from "./context/musicPlayerContext";
import Player from "./Music-Player/Player";

function App() {
  const { handleSideBar, showSideBar } = useContext(SongContext);
  return (
    <AuthContextProvider>

      <CartContextProvider>
        <MusicPlayerContextProvider>
        <Router>
          <div className="App flex flex-col">
            <Navbar />
            <div className="flex flex-1 h-[cal(100vh - 80px)] gap-5">

              <div className={`sidebar fixed top-0 left-0 z-50 h-full transition-all duration-200 ease-in-out transform ${showSideBar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:static lg:h-[auto] `}>
                <SideBar />
              </div>
              
              <div className="flex flex-col-reverse w-full gap-5 lg:flex-row">
                <div className="w-[90%] mx-auto lg:w-[73%] ">
                  <Switch>
                    <Route path="/" exact>
                      <Home />
                    </Route>
                    <Route path="/allsongs" >
                      <AllSongs />
                    </Route>
                    <Route path="/cart" >
                      <CartPage />
                    </Route>
                  </Switch>
                </div>
                <div className=" w-[90%] mx-auto lg:w-[40%] xl:w-[27%]">
                  <TopSongs />
                </div>
              </div>

              
              
            </div>
            <Player />
          </div>
        </Router>
        </MusicPlayerContextProvider>
      </CartContextProvider>
    </AuthContextProvider>
  );
}

export default App;
