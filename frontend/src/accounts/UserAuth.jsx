import { createContext } from "react";

const UserAuth = createContext({
  authenticated: window.localStorage.getItem("isAuth"),
  setAuthenticated: (auth) => {},
});
export default UserAuth;
