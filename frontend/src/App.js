import reactDom from "react-dom";
import "./App.css";
import Footer from "./base/Footer";
import { Switch, Route } from "react-router-dom";
import Login from "./accounts/Login";
import Signup from "./accounts/Signup";
import UserAuth from "./accounts/UserAuth";
import React from "react";
import AuthNav from "./base/AuthNav";
import UnAuthNav from "./base/UnAuthNav";
import OfficeList from "./dashboard/OfficeList";
import Chat from "./Chat/Chat"
function App() {
  const [authenticated, setAuthenticated] = React.useState(true);
  return (
    <>
      
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/chat" component={Chat}/>
          
        </Switch>
        {() => {
          if (!authenticated) {
            return <Footer />;
          }
        }}
      
    </>
  );
}

export default App;
