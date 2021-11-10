import React, { useState } from "react";
import styled from "styled-components";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { useHistory } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import { app } from "../../firebase";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [signin, setSignin] = useState(false);
  const [errors, setErrors] = useState("");
  const history = useHistory();

  const SignIn = async () => {
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      history.push("/");
    } catch (err) {
      return setErrors(err.message);
    }
  };
  const signinWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const googleSignup = await signInWithPopup(auth, provider);

    if (googleSignup) {
      const collectionRef = doc(app, "userdata", googleSignup.user.uid);
      const payload = { username, email };
      setDoc(collectionRef, payload);
    }
  };

  const SignUp = async () => {
    try {
      const auth = getAuth();
      const userData = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(userData.user, { displayName: username });

      if (userData) {
        const collectionRef = doc(app, "userdata", userData.user.uid);
        const payload = { email, username };
        setDoc(collectionRef, payload);
      }
      setEmail("");
      setPassword("");
      history.push("/");
    } catch (err) {
      return setErrors(err.message);
    }
  };

  return (
    <Container>
      <Wrapper>
        {signin ? (
          <Form>
            <HeaderTitle>Sign Up</HeaderTitle>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              {errors}
              {/* {errors === "Firebase: Error (auth/invalid-email)." &&
              "Firebase: Password should be at least 6 characters (auth/weak-password)."
                ? "Email or password is not valid"
                : null} */}
            </div>
            <Button onClick={SignUp}>Sign Up</Button>
            <SignText>
              Already have an account, <div onClick={() => setSignin(false)}>Sign In</div>
            </SignText>
            <p>
              Sign in with <span onClick={signinWithGoogle}>Google</span>
            </p>
          </Form>
        ) : (
          <Form>
            <HeaderTitle>SignIn</HeaderTitle>
            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              {errors === "Firebase: Error (auth/user-not-found)." &&
              "Firebase: Error (auth/wrong-password)."
                ? "User not found"
                : null}
            </div>

            <Button onClick={SignIn}>Sign In</Button>
            <SignText>
              Don't have an account <div onClick={() => setSignin(true)}>Sign Up</div>
            </SignText>
            <p>
              Sign in with <span onClick={signinWithGoogle}>Google</span>
            </p>
          </Form>
        )}
      </Wrapper>
    </Container>
  );
};
const SignText = styled.div`
  div {
    font-weight: bold;
    color: green;
    cursor: pointer;
  }
`;
const Button = styled.div`
  width: 70%;
  height: 40px;
  background: green;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  transition: all 350ms;
  border-radius: 5px;
  color: white;

  :hover {
    cursor: pointer;
    background: transparent;
    border: 1px solid green;
    color: black;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 300px;
  height: 40px;
  border-radius: 5px;
  margin: 10px 0;
  outline: 0;
  border: 1px solid rgb(234, 234, 234);
`;
const HeaderTitle = styled.h1``;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 80vh;
`;
