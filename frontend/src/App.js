import reactDom from "react-dom";
import "./App.css";
import Footer from "./base/Footer";
import Navbar from "./base/Navbar";
import Chat from "./Chat/Chat";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <>
    
      <Router>
     
      <Switch>
      <Route exact path="/chat" component={Chat}/>
      </Switch>
     
      
      </Router>
    </>
  );
}

export default App;
