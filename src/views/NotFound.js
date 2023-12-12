import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  font-family: Merriweather;
  font-size: 46px;
  font-weight: 700;
  line-height: 80px;
  letter-spacing: 0em;
  text-align: center;
  color: #172234;
`;
const NotFound = () => {
  return (
    <>
      <Wrapper>404: Page Not Found</Wrapper>
    </>
  );
};

export default NotFound;
