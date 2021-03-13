import { createContext } from "react";

const UserAuth = createContext({
  authenticated: false,
  setAuthenticated: (auth) => {},
});
export default UserAuth;
