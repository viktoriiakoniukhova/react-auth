import React from "react";
import styled from "styled-components";
import headerOverlay from "../assets/header-overlay.png";
import header from "../assets/header.png";
import { media } from "../breakpoints";

const StyledHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: no-repeat center / cover url(${header});
  img {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  gap: 2em;
  z-index: 1;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1em;
  color: #fff;
  h1 {
    font-family: Merriweather;
    font-size: 64px;
    font-weight: 700;
    line-height: 80px;
    letter-spacing: 0em;
    text-align: center;
    ${media.sm`
        font-size: 46px;
    `}
  }
  p {
    font-family: Lato;
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    letter-spacing: -0.02em;
    text-align: center;
    ${media.sm`
        font-size: 18px;
    `}
  }
`;

const Button = styled.button`
  display: flex;
  text-align: center;
  border: 1px solid #fff;
  background: none;
  color: #fff;
  padding: 0.5em 1.5em;
  border-radius: 5px;

  font-family: Merriweather;
  font-size: 20px;
  font-weight: 700;
  line-height: 34px;
  letter-spacing: 0px;
  text-align: left;

  &:hover {
    cursor: pointer;
  }
`;

const Header = ({ style }) => {
  return (
    <StyledHeader style={style}>
      <img src={headerOverlay} alt="header-overlay" />
      <Content>
        <Section>
          <h1>SPDload Test Task</h1>
          <p>You're welcome to register via buttons in panel.</p>
        </Section>
      </Content>
    </StyledHeader>
  );
};

export default Header;
