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
import Home from "./dashboard/Home";
import Navbar from "./base/Navbar";
import BoardList from "./dashboard/board/BoardList";
import CreateRoom from "./dashboard/room/CreateRoom";
import CardList from "./dashboard/card/CardList";
function App() {
  const [authenticated, setAuthenticated] = React.useState(false);
  return (
    <>
      <UserAuth.Provider value={{ authenticated, setAuthenticated }}>
        <Navbar authenticated={authenticated} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/boardlist" component={BoardList} />
          <Route exact path="/createroom" component={CreateRoom} />
          <Route exact path="/cardlist" component={CardList} />
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
