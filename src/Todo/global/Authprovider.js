import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "@firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ mgs: "This is the global state", currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
