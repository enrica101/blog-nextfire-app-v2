import { createContext } from "react";

//initializes a context with a default value of an object
export const UserContext = createContext({ user: null, username:null })