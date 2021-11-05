import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../global/Authprovider";
import { getAuth } from "@firebase/auth";

export const Header = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  const signOut = async () => {
    const auth = getAuth();
    await auth.signOut();
  };
  return (
    <Container>
      <Wrapper>
        <Logo />
        <Navigation>
          <Nav to="/">Home</Nav>
          {currentUser ? <Nav to="/newtask">Create Task</Nav> : null}
        </Navigation>
        {currentUser ? <div onClick={signOut}>Logout</div> : <Nav to="/login">Login</Nav>}
      </Wrapper>
    </Container>
  );
};

const Logo = styled.div`
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  margin: 0 10px;
`;
const Navigation = styled.div`
  display: flex;
  flex: 1;
`;
const Nav = styled(Link)`
  text-decoration: none;
  margin: 0 20px;
  font-weight: bold;
  color: white;
  padding: 10px 20px;
  transition: all 350ms;

  :hover {
    cursor: pointer;
    background: rgb(255, 255, 255, 0.6);
    border-radius: 5px;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
const Container = styled.div`
  width: 100%;
  height: 70px;
  background: green;
`;
