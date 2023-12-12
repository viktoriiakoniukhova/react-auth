import React from "react";
import login from "../assets/login.png";
import styled from "styled-components";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { media } from "../breakpoints";
import { useData } from "../App";

const Wrapper = styled.div`
  display: flex;
  background: #f2f2f2;
  ${media.sm`
    flex-direction: column;
  `}
`;

const ImgCont = styled.div`
  display: flex;
  flex: 2;
  ${media.md`
    flex: 1;
  `}
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  ${media.sm`
    flex: 2;
  `}
`;

const Auth = ({ type }) => {
  const { navbarRect } = useData();

  return (
    <Wrapper style={{ height: `calc(100vh - ${navbarRect.height}px)` }}>
      <ImgCont>
        <img src={login} alt="towers" />
      </ImgCont>
      <ContentWrapper>
        {type === "login" ? <Login /> : <SignUp />}
      </ContentWrapper>
    </Wrapper>
  );
};

export default Auth;
