import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Homepage";
import AuthContextProvider from "./context/firebaseContext";
import PasswordReset from "./UserAccounts/PasswordReset";
import SongcontextProvider from "./context/songContext";
import SignIn from "./UserAccounts/SignIn";
import SignUp from "./UserAccounts/SignUp";
import SideBar from "./components/SideBar/SideBar";
import AllSongs from "./Songs/AllSongs";
import TopSongs from "./Songs/TopSongs";
import Navbar from "./components/Shared/Header/Navbar";

function App() {
  return (

    <AuthContextProvider >
      <SongcontextProvider>
      <Router >
        <div className="App flex flex-col">
          <Navbar />

          <div className="flex flex-1 h-[cal(100vh - 80px)] gap-5" >
            <div className="">
              <SideBar />
            </div>

            <div className="flex w-full gap-5">
              <div className=" w-[73%] mx-auto ">
              <Switch >
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/allsongs" >
                  <AllSongs />
                </Route>
              </Switch>
              </div>
              <div className="border-l w-[27%]">
                <TopSongs />
              </div>
            </div>


          </div>
          <Navbar />
        </div>
      </Router>
        
      </SongcontextProvider>
    </AuthContextProvider>
    
    
  );
}

export default App;
