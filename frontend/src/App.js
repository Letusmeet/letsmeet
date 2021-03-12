import "./App.css";
import Footer from "./base/Footer";
import Navbar from "./base/Navbar";
import { Switch, Route } from "react-router-dom";
import Login from "./accounts/Login";
import Signup from "./accounts/Signup";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
      <h1>Hii</h1>
      <Footer />
    </>
  );
}

export default App;
