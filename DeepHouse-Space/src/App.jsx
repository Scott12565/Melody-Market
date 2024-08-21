import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import CartContextProvider from "./context/CartContext";
import MusicPlayerContextProvider from "./context/musicPlayerContext";
import PlayListContextProvider from "./context/PlayListContext";
import SideBar from "./components/SideBar/SideBar";
import Navbar from "./components/Shared/Header/Navbar";
import Player from "./Music-Player/Player";
import Loaders from "./components/Loaders";
import { SongContext } from "./context/songContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { AuthContext } from "./context/firebaseContext";
import CheckPurchaseProvider from "./context/downloadContext";
import MessageProvider from "./context/messageContext";
import Messages from "./components/Message";
import EmailVerification from "./UserAccounts/EmailVerification";

const Home = lazy(() => import("./Pages/Homepage"));
const SignIn = lazy(() => import("./UserAccounts/SignIn"));
const SignUp = lazy(() => import("./UserAccounts/SignUp"));
const PasswordReset = lazy(() => import("./UserAccounts/PasswordReset"));
const AllSongs = lazy(() => import("./Songs/AllSongs"));
const TopSongs = lazy(() => import("./Songs/TopSongs"));
const PlayList = lazy(() => import("./Pages/playlist/PlayList"));
const Collections = lazy(() => import("./Pages/Colections"));
// const Messages = lazy(() => import("./components/Message"));

function App() {
  const { showSideBar } = useContext(SongContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <PlayListContextProvider>
        <MessageProvider>
          <CartContextProvider>
            <MusicPlayerContextProvider>
              <CheckPurchaseProvider>
                <Suspense fallback={<Loaders />}>
                 
                  <div className="App flex flex-col">
                    <Messages />
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
                            <Route path="/allsongs" >
                              <AllSongs />
                            </Route>
                            <ProtectedRoutes path="/collection" component={Collections} currentUser={currentUser} />
                            <ProtectedRoutes path="/playlist" component={PlayList} currentUser={currentUser} />
                            <Route path="/signin">
                              <SignIn />
                            </Route>
                            <Route path="/signup">
                              <SignUp />
                            </Route>
                            <Route path="/verify-email" component={EmailVerification} />
                            <Route path="/resetpassword">
                              <PasswordReset />
                            </Route>
                          </Switch>
                        </div>
                        
                        <div className="w-[90%] mx-auto lg:w-[40%] xl:w-[27%] ">
                          {
                            (location.pathname !== "/collection" && location.pathname !== "/playlist") && (<TopSongs />)
                          }
                        </div>
                      </div>
                    </div>
                    <Player />
                  </div>
                </Suspense>
              </CheckPurchaseProvider>
            </MusicPlayerContextProvider>
          </CartContextProvider>
        </MessageProvider>
      </PlayListContextProvider>
    </Router>
  );
}

export default App;
