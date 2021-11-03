import React, { useState, useEffect, createContext } from "react";
import app from "../../firebase";
import { getAuth } from "@firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
