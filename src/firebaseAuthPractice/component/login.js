import React from "react";
import { useSignIn } from "../hooks/useSignIn";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const Login = () => {
  const { signIn, isPending, error } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = (e) => {
    e.preventDefault();
    console.log("submitted ", email, password);
    signIn(email, password);
  };
  return (
    <div style={container}>
      <form style={forms}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPending && <button onClick={logIn}>Login</button>}
        {isPending && <button disabled>Loading...</button>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
const forms = {
  width: "500px",
  minHeight: "50vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
const container = {
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
