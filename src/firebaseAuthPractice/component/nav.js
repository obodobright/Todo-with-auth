import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useSignOut } from "../hooks/useLogout";

const NavBar = () => {
  const { signOut } = useSignOut();

  const signout = () => {
    signOut();
  };
  return (
    <Container>
      <Wrapper>
        <Link to="/">
          <Logo />
        </Link>

        <Navigation>
          <Nav to="/create">Create</Nav>
          <Nav to="/login">Login</Nav>
          <Nav to="/signup">Sign up</Nav>
          <NavBtn onClick={signout}>Log out</NavBtn>
        </Navigation>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
const NavBtn = styled.div``;
const Logo = styled.div`
  width: 100px;
  height: 50px;
  background: blue;
  margin-left: 20px;
`;
const Nav = styled(Link)`
  text-decoration: none;
  margin: 0 10px;
`;
const Navigation = styled.div`
  display: flex;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Container = styled.div`
  width: 100%;
  height: 80px;
  background: whitesmoke;
`;
