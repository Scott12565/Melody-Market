import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/UserAccounts/SignUp";
import HomePage from "./components/Pages/Homepage";
import SignIn from "./components/UserAccounts/SignIn";
import AuthContextProvider from "./components/context/firebaseContext";
import Navbar from "./components/Shared/Header/Navbar";
import PasswordReset from "./components/UserAccounts/PasswordReset";

function App() {
  return (

    <AuthContextProvider >
      <Router >
      
        <div className="App">
        <Navbar />
          <Switch >
            <Route path="/" exact>
              <HomePage />
            </Route>
            <Route path="/signup" >
              <SignUp />
            </Route>
            <Route path="/signin" >
              <SignIn />
            </Route>
            <Route path="/passwordreset" >
              <PasswordReset />
            </Route>
          </Switch>
          <Navbar />
        </div>
      </Router>
    </AuthContextProvider>
    
    
  );
}

export default App;
