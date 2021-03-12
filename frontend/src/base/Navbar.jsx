import React, { useContext } from "react";
import UserAuth from "../accounts/UserAuth.jsx";
import AuthNav from "./AuthNav";
import UnAuthNav from "./UnAuthNav";

function NavBar(props) {
  return <>{props.value.authenticated ? <AuthNav /> : <UnAuthNav />}</>;
}
export default NavBar;
