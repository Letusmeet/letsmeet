import React, { useContext } from "react";
import UserAuth from "../accounts/UserAuth.jsx";
import AuthNav from "./AuthNav";
import UnAuthNav from "./UnAuthNav";

function NavBar(props) {
  const { authenticated } = React.useContext(UserAuth);
  return <>{authenticated ? <AuthNav /> : <UnAuthNav />}</>;
}
export default NavBar;
