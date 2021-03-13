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
<<<<<<< HEAD
import Chat from "./Chat/Chat";
=======
import OfficeList from "./dashboard/OfficeList";
>>>>>>> d56141d5f7b802c136640e5fe45b86278e756805

function App() {
  const [authenticated, setAuthenticated] = React.useState(true);
  return (
    <>
      
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/chat" component={Chat}/>
        </Switch>
<<<<<<< HEAD
      
     
=======
        {() => {
          if (!authenticated) {
            return <Footer />;
          }
        }}
      </UserAuth.Provider>
>>>>>>> d56141d5f7b802c136640e5fe45b86278e756805
    </>
  );
}

export default App;
