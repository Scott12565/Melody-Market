import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Pages/Homepage";
import AuthContextProvider from "./context/firebaseContext";
import Navbar from "./components/Shared/Header/Navbar";
import PasswordReset from "./UserAccounts/PasswordReset";
import SongcontextProvider from "./context/songContext";
import SignIn from "./UserAccounts/SignIn";
import SignUp from "./UserAccounts/SignUp";
import SideBar from "./components/SideBar/SideBar";
import AllSongs from "./Songs/AllSongs";
import TopSongs from "./Songs/TopSongs";

function App() {
  return (

    <AuthContextProvider >
      <SongcontextProvider>
      
      <Router >
      
        <div className="App flex flex-col">
          <Navbar />

          <div className="flex h-[cal(100vh - 80px)] gap-5 " >
            <div className="">
              <SideBar />
            </div>

            <div className="flex w-full bg-blue-200 gap-5">
              <div className="bg-orange-300 w-[70%] mx-auto ">
              <Switch >
                <Route path="/" exact>
                  <Home />
                </Route>
                <Route path="/allsongs" >
                  <AllSongs />
                </Route>
              </Switch>
              </div>
              <div className="bg-green-200 w-[30%]">
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
