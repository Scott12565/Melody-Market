import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/UserAccounts/SignUp";
import HomePage from "./components/Pages/Homepage";
import SignIn from "./components/UserAccounts/SignIn";

function App() {
  return (
    <Router >
      <div className="App  ">
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
        </Switch>
        
      </div>
    </Router>
    
  );
}

export default App;
