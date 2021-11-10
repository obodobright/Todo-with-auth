import React, { createContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState([]);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     setCurrentUser(user);
  //   });
  // }, []);

  return (
    <AuthContext.Provider value={{ mgs: "This is the global state", currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
