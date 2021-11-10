import React from "react";
import { useSignUp } from "../hooks/useSignUp";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useContext } from "react";

const SignUp = () => {
  const { signUp, isPending, error } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    signUp(email, password, username);
  };
  return (
    <div style={container}>
      <form style={forms}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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

        {!isPending && <button onClick={handleSignUp}>Login</button>}
        {isPending && <button disabled>Loading..</button>}
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
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
