import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { media } from "../breakpoints";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slice/auth";

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0.7em 4em;
  ${media.sm`
    justify-content: center;
  `}
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const StyledLink = styled(Link)`
  border: 1px solid #b29f7e;
  background: #172234;
  color: #b29f7e;
  padding: 0.5em 1.5em;
  border-radius: 5px;

  font-family: Merriweather;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  text-align: center;

  &.main {
    background: #b29f7e;
    color: #ffffff;
  }
`;

const Button = styled.button`
  display: flex;
  text-align: center;
  border: 1px solid #fff;
  background: #b29f7e;
  color: #ffffff;
  padding: 0.5em 1.5em;
  border-radius: 5px;

  font-family: Merriweather;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;

  &:hover {
    cursor: pointer;
  }
`;

const Navbar = (props, ref) => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.user);

  return (
    <StyledNavbar ref={ref}>
      <Nav>
        {data ? (
          <Button onClick={() => dispatch(logout())}>Logout</Button>
        ) : (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/signup" className="main">
              Sign Up
            </StyledLink>
          </>
        )}
      </Nav>
    </StyledNavbar>
  );
};

export default React.forwardRef(Navbar);
