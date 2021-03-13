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
import Chat from "./Chat/Chat";

import OfficeList from "./dashboard/OfficeList";
import Navbar from "./base/Navbar";
function App() {
  const [authenticated, setAuthenticated] = React.useState(false);
  return (
    <>
      <UserAuth.Provider value={{ authenticated, setAuthenticated }}>
        {/* <Navbar authenticated={authenticated} /> */}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/dashboard" component={OfficeList} />
          <Route exact path="/chat" component={Chat} />
        </Switch>
        {() => {
          if (!authenticated) {
            return <Footer />;
          }
        }}
      </UserAuth.Provider>
    </>
  );
}

export default App;
