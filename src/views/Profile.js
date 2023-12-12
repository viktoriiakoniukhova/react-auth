import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { media } from "../breakpoints";
import { useData } from "../App";
import UpdateName from "../components/updateProfile/UpdateName";
import UpdateImage from "../components/updateProfile/UpdateImage";

const Wrapper = styled.div`
  display: flex;
  padding: 2em 0 2em 0;
  background: #f2f2f2;
  ${media.sm`
    flex-direction: column;
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

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 50%;
  width: 150px;
  height: 150px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  gap: 2em;
  z-index: 1;
  ${media.md`
    flex-direction: column;
  `}
`;

const Text = styled.p`
  font-family: Merriweather;
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0px;
  margin: 50px 0 50px 0;
  text-transform: capitalize;
`;

const Profile = ({ style }) => {
  const { navbarRect } = useData();

  const user = useSelector((state) => state.user);
  const { loading, data, error } = user;

  return (
    <Wrapper style={{ minHeight: `calc(100vh - ${navbarRect.height}px)` }}>
      {loading ? (
        "Is Loading"
      ) : !error && data ? (
        <ContentWrapper>
          <ImageWrapper>
            <img
              src={data.avatarURL}
              alt="ava"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
          </ImageWrapper>
          <Text>Вітаємо, {data.name}!</Text>
          <Content>
            <UpdateName />
            <UpdateImage />
          </Content>
        </ContentWrapper>
      ) : (
        error
      )}
    </Wrapper>
  );
};

export default Profile;
