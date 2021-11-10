import React, { createContext, useReducer } from "react";
import { fetchReducer } from "../reducers/authReducer";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fetchReducer, { user: null });
  console.log("auth state", state);

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
